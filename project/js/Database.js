class Database {
    static userDatabase = new Map();

    // Retrieve the user database
    static getDatabase() {
        return this.userDatabase;
    }

    // Add a user to the database
    static addUser(user) {
        // Add user to the database using their unique userID as the key
        this.userDatabase.set(user.getUserID(), user);
    }

    // Get a user by their ID
    static getUser(userID) {
        return this.userDatabase.get(userID) || null;
    }

    // Check equality (for testing purposes, comparing userDatabase)
    equals(other) {
        if (!(other instanceof Database)) {
            return false;
        }
        return JSON.stringify([...this.userDatabase]) === JSON.stringify([...other.userDatabase]);
    }
}

// Example usage:
// Assume UserProfile is another class that you have implemented in JavaScript.
class UserProfile {
    constructor(username, userID) {
        this.username = username;
        this.userID = userID;
    }

    getUserID() {
        return this.userID;
    }
}
