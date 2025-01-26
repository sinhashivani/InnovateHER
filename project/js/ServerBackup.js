// const net = require('net');
// const fs = require('fs');
// const path = require('path');

// // User-defined modules (implement these based on your existing Java classes)
// const { UserProfile } = require('./userprofile.js');
// const { Post } = require('./Post');
// const { Comment } = require('./Comment');
// const { Message } = require('./Message');

// // ServerBackup class
// class ServerBackup {
//     static PORT = 12344;
//     static userDatabase = {};

//     constructor() {
//         this.server = net.createServer(this.handleConnection.bind(this));
//         ServerBackup.loadUserDatabase();
//     }

//     start() {
//         this.server.listen(ServerBackup.PORT, () => {
//             console.log(`Server started on port ${ServerBackup.PORT}`);
//         });
//     }

//     handleConnection(socket) {
//         console.log('New client connected');
//         socket.setEncoding('utf8');

//         socket.on('data', async (data) => {
//             try {
//                 const message = JSON.parse(data);
//                 await this.handleRequest(message, socket);
//             } catch (err) {
//                 console.error('Error processing message:', err.message);
//             }
//         });

//         socket.on('close', () => {
//             console.log('Client disconnected.');
//         });

//         socket.on('error', (err) => {
//             console.error('Socket error:', err.message);
//         });
//     }

//     async handleRequest(message, socket) {
//         const { messageType, data } = message;
//         let response;

//         switch (messageType) {
//             case 1: // Create user profile
//                 response = this.createUserProfile(data);
//                 break;

//             case 2: // Login
//                 response = this.loginUser(data);
//                 break;

//             case 3: // Refresh feed
//                 response = this.refreshFeed(data);
//                 break;

//             case 4: // Get friends list
//                 response = this.getFriendsList(data);
//                 break;

//             case 5: // Add post
//                 response = this.addPost(data);
//                 break;

//             case 6: // Search user
//                 response = this.searchUser(data);
//                 break;

//             default:
//                 response = { messageType: 999, data: ['Invalid request type'] };
//         }

//         socket.write(JSON.stringify(response));
//     }

//     createUserProfile(data) {
//         const [username, password, pfp] = data;

//         if (Object.values(ServerBackup.userDatabase).some((user) => user.username === username)) {
//             return { messageType: 201, data: ['Username already taken'] };
//         }

//         const newUser = new UserProfile(username, password, pfp);
//         ServerBackup.userDatabase[newUser.userID] = newUser;
//         this.saveUserProfile(newUser);

//         return { messageType: 101, data: ['User profile created successfully'] };
//     }

//     loginUser(data) {
//         const [username, password] = data;

//         const user = Object.values(ServerBackup.userDatabase).find(
//             (user) => user.username === username && user.password === password
//         );

//         if (user) {
//             return { messageType: 102, data: [1, user] };
//         }
//         return { messageType: 102, data: [0] };
//     }

//     refreshFeed(data) {
//         const userID = data[0];
//         const user = ServerBackup.userDatabase[userID];

//         if (user && user.friends.length > 0) {
//             const feed = user.friends
//                 .filter((friendID) => !user.blockedFriends.includes(friendID))
//                 .flatMap((friendID) => Object.values(ServerBackup.userDatabase[friendID].posts));

//             return { messageType: 103, data: [feed] };
//         }

//         return { messageType: 203, data: ['User has no friends :('] };
//     }

//     getFriendsList(data) {
//         const userID = data[0];
//         const user = ServerBackup.userDatabase[userID];

//         if (user) {
//             return { messageType: 104, data: [user.friends] };
//         }

//         return { messageType: 204, data: ['User not found'] };
//     }

//     addPost(data) {
//         const [userID, post] = data;
//         const user = ServerBackup.userDatabase[userID];

//         if (user) {
//             const postID = user.addPost(post);
//             this.saveUserProfile(user);
//             return { messageType: 105, data: [postID] };
//         }

//         return { messageType: 205, data: ['User not found'] };
//     }

//     searchUser(data) {
//         const query = data[0];
//         const results = Object.values(ServerBackup.userDatabase).filter((user) =>
//             user.username.includes(query)
//         );

//         return { messageType: 106, data: [results] };
//     }

//     static loadUserDatabase() {
//         const userDirectory = path.join(__dirname, 'UserData');
//         if (!fs.existsSync(userDirectory)) {
//             console.log('UserData directory not found.');
//             return;
//         }

//         fs.readdirSync(userDirectory).forEach((file) => {
//             if (file.endsWith('.json')) {
//                 const filePath = path.join(userDirectory, file);
//                 const userData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
//                 const user = new UserProfile(
//                     userData.username,
//                     userData.password,
//                     userData.profilePicture
//                 );
//                 user.userID = userData.userID;
//                 ServerBackup.userDatabase[user.userID] = user;
//             }
//         });

//         console.log(`User database loaded with ${Object.keys(ServerBackup.userDatabase).length} users.`);
//     }

//     saveUserProfile(user) {
//         const userDirectory = path.join(__dirname, 'UserData');
//         if (!fs.existsSync(userDirectory)) {
//             fs.mkdirSync(userDirectory);
//         }

//         const filePath = path.join(userDirectory, `${user.userID}.json`);
//         fs.writeFileSync(filePath, JSON.stringify(user), 'utf8');
//     }
// }

// // Start the server
// const serverBackup = new ServerBackup();
// serverBackup.start();
