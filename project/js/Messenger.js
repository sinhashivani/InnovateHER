const fs = require("fs");
const path = require("path");

class Messenger {
    constructor(userOne, userTwo) {
        this.userOne = userOne;
        this.userTwo = userTwo;
        this.messageCount = 1;

        const filePath = this.getFile();
        if (fs.existsSync(filePath)) {
            const lines = fs.readFileSync(filePath, "utf-8").split("\n").filter(Boolean);
            const lastLine = lines[lines.length - 1];
            if (lastLine) {
                const dotIndex = lastLine.indexOf(".");
                if (dotIndex !== -1) {
                    const lastNumberStr = lastLine.substring(0, dotIndex).trim();
                    if (!isNaN(lastNumberStr)) {
                        this.messageCount = parseInt(lastNumberStr) + 1;
                    }
                }
            }
        }
    }

    // Setters and Getters
    setUserOne(user) {
        this.userOne = user;
    }

    setUserTwo(user) {
        this.userTwo = user;
    }

    setMessageCount(count) {
        this.messageCount = count;
    }

    getUserOne() {
        return this.userOne;
    }

    getUserTwo() {
        return this.userTwo;
    }

    getMessageCount() {
        return this.messageCount;
    }

    // Get the filename of the message log
    getFile() {
        const directoryName = "MessageLogs";
        const directoryPath = path.join(__dirname, directoryName);

        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath);
        }

        const firstUser = this.userOne.displayName.toLowerCase() <= this.userTwo.displayName.toLowerCase()
            ? this.userOne.displayName : this.userTwo.displayName;
        const secondUser = firstUser === this.userOne.displayName
            ? this.userTwo.displayName : this.userOne.displayName;

        const fileName = `${firstUser} , ${secondUser} Message Log.txt`;
        const filePath = path.join(directoryPath, fileName);

        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, `------------------------------------\n[${firstUser}] & [${secondUser}] Message Log\n------------------------------------\n`);
        }

        return filePath;
    }

    // Get message log filenames for a specific user
    getMessages(user) {
        const directoryPath = path.join(__dirname, "MessageLogs");
        const messageLogs = [];

        if (fs.existsSync(directoryPath)) {
            const files = fs.readdirSync(directoryPath);
            files.forEach(file => {
                if (file.includes(`${user.displayName}`) && file.endsWith("Message Log.txt")) {
                    messageLogs.push(file);
                }
            });
        }

        return messageLogs;
    }

    // Retrieve a user profile by display name from "storage.txt"
    static getUserProfileByDisplayName(displayName) {
        const filePath = path.join(__dirname, "storage.txt");
        if (!fs.existsSync(filePath)) {
            console.log("Storage file not found.");
            return null;
        }

        const lines = fs.readFileSync(filePath, "utf-8").split("\n").filter(Boolean);
        for (const line of lines) {
            const parts = line.split(",");
            if (parts.length >= 6 && parts[1] === displayName) {
                const [username, , email, password, bio] = parts;
                console.log(`${username},${displayName},${email},${password},${bio}`);
                return new UserProfile(`${username},${displayName},${email},${password},${bio}`);
            }
        }

        console.log(`User with display name "${displayName}" not found.`);
        return null;
    }

    // Check if two users can message each other
    checkPermissions() {
        const db = new Database();
        if (db.isBlocked(this.userOne.username, this.userTwo.username)) return false;
        if (db.isBlocked(this.userTwo.username, this.userOne.username)) return false;
        return this.userOne.wantMessage && this.userTwo.wantMessage;
    }

    // Send a message between users
    sendMessage(message, user) {
        if (this.checkPermissions()) {
            const filePath = this.getFile();
            const logMessage = `${this.messageCount}. ${user.displayName}: ${message}\n`;
            fs.appendFileSync(filePath, logMessage);
            this.messageCount++;
        } else {
            console.log("Unable to message user");
        }
    }

    // Delete a specific message from the log
    deleteMessage(messageNumber) {
        if (this.checkPermissions()) {
            const filePath = this.getFile();
            const lines = fs.readFileSync(filePath, "utf-8").split("\n").filter(Boolean);
            const headerLines = lines.slice(0, 3);
            const messages = lines.slice(3).filter(line => {
                const dotIndex = line.indexOf(".");
                if (dotIndex !== -1) {
                    const numberPart = line.substring(0, dotIndex).trim();
                    return parseInt(numberPart) !== messageNumber;
                }
                return true;
            });

            const updatedLog = [...headerLines, ...messages.map((msg, index) => `${index + 1}. ${msg.split(". ")[1]}`)];
            fs.writeFileSync(filePath, updatedLog.join("\n") + "\n");
        } else {
            console.log("Unable to delete message: Permission denied.");
        }
    }
}

module.exports = Messenger;
