const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

async function listDatabases(client) {
    console.log("here");
    databasesList = await client.db().admin().listDatabases();


    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

// Initialize Express
const app = express();
const PORT = 4000;

// Middleware
app.use(bodyParser.json());

const uri = "mongodb+srv://sinhashivani:test123@mongo.uq02aik.mongodb.net/?retryWrites=true&w=majority&appName=Mongo";
const client = new MongoClient(uri);

async function main() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

// API Endpoints

// Create a New User Profile
app.post('/api/user', async (req, res) => {
    try {
        const { username, displayName, email, password, bio, profilePicture } = req.body;

        const newUser = {
            username,
            displayName,
            email,
            password,
            bio: bio || '',
            profilePicture: profilePicture || null,
            wantMessage: true,
            friends: [],
            blockedFriends: []
        };

        const result = await client.collection('profiles').insertOne(newUser); // Adjust collection name
        res.status(201).json({ message: 'User profile created successfully!', user: result.ops[0] });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user profile', error: error.message });
    }
});

// Get All User Profiles
app.get('/api/users', async (req, res) => {
    try {
        const users = await client.collection('profiles').find().toArray(); // Adjust collection name
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profiles', error: error.message });
    }
});

// Get a Single User Profile
app.get('/api/user/:username', async (req, res) => {
    try {
        const user = await client.collection('profiles').findOne({ username: req.params.username }); // Adjust collection name
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
});

main().catch(console.error);
// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
