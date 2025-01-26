const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const express = require('express');
const app = express();
app.use(express.json());
const PORT = 5500;
app.use(cors());

// Middleware
app.use(bodyParser.json());
const uri = "mongodb+srv://sinhashivani:test123@mongo.uq02aik.mongodb.net/?retryWrites=true&w=majority&appName=Mongo";
const client = new MongoClient(uri);

app.listen(PORT, async () => {
    try {
        await connectToDatabase();
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (error) {
        console.error("Could not start server:", error);
    }
});

async function listDatabases(client) {
    const db = await connectToDatabase();
    databasesList = await client.db().admin().listDatabases();


    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

// app.post('/api/user', async (req, res) => {
//     console.log('Received request:', req.body); // Debugging line
//     try {
//         // Existing logic here
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(400).json({ message: 'Error creating user profile', error: error.message });
//     }
// });


// Initialize Express




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

main().catch(console.error);

// app.post('/api/user', async (req, res) => {
//     try {
//         const { username, displayName, email, password, profilePicture } = req.body;
//         // Handle database insertion logic here
//         res.status(201).json({ message: 'User profile created successfully!' });
//     } catch (error) {
//         res.status(400).json({ message: 'Error creating user profile', error: error.message });
//     }
// });


// Database Connection Function
async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB database");
        return client.db("test"); // Specify your database name
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
    }
}

// Create a New User Profile
app.post('/api/user', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const { username, displayName, email, password, profilePicture } = req.body;

        // Hash the password before storing
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = {
            username,
            displayName,
            email,
            password: hashedPassword,
            profilePicture: profilePicture || null,
            wantMessage: true,
            friends: [],
            blockedFriends: [],
            userID: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
        };

        const collection = db.collection('profiles');

        const existingUser = await collection.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const result = await collection.insertOne(newUser);
        res.status(201).json({
            message: 'User profile created successfully!',
            user: {
                username: newUser.username,
                displayName: newUser.displayName,
                email: newUser.email,
                userID: newUser.userID
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user profile', error: error.message });
    }
});

// Get All User Profiles
app.get('/api/users', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('profiles');

        // Exclude sensitive information like password
        const users = await collection.find({}, {
            projection: {
                password: 0,  // Exclude password
                blockedFriends: 0  // Optionally exclude other sensitive fields
            }
        }).toArray();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profiles', error: error.message });
    }
});

// Get a Single User Profile
app.get('/api/user/:username', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('profiles');

        const user = await collection.findOne(
            { username: req.params.username },
            {
                projection: {
                    password: 0,  // Never return password
                    blockedFriends: 0  // Optionally exclude other sensitive fields
                }
            }
        );

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
});

// Graceful shutdown
process.on('SIGINT', async () => {
    try {
        await client.close();
        console.log('MongoDB connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
        process.exit(1);
    }
});