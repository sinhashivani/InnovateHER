use("test");

db.profiles.insertMany([
    {
        username: "johndoe",
        displayName: "John Doe",
        email: "john@example.com",
        password: "hashedPasswordHere",
        wantMessage: true,
        profilePicture: null,
        friends: [],
        blockedFriends: [],
        userID: 12345
    },
    {
        username: "janedoe",
        displayName: "Jane Doe",
        email: "jane@example.com",
        password: "anotherHashedPasswordHere",
        wantMessage: true,
        profilePicture: null,
        friends: [],
        blockedFriends: [],
        userID: 67890
    }
]);

db.profiles.find({});
db.profiles.findOne({ username: "johndoe" });

let userCount = db.profiles.countDocuments();
print(`Total users: ${userCount}`); 