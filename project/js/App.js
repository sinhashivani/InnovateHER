// const createProfileBtn = document.getElementById('createProfileBtn');
// const express = require('express');
// const cors = require('cors');
// document.addEventListener('DOMContentLoaded', () => {



//     // Add this near the top of your server.js
//     const app = express();

//     // Enable CORS for all routes
//     app.use(cors());

//     createProfileBtn.addEventListener('click', async () => {
//         // Gather input values
//         console.log('hi');
//         const username = document.getElementById('username').value;
//         const displayName = document.getElementById('display-name').value;
//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;
//         const profilePicInput = document.getElementById('profile-pic');

//         // Simulate profile picture upload
//         let profilePic = null;
//         if (profilePicInput.files.length > 0) {
//             profilePic = profilePicInput.files[0].name; // Just the file name for now
//         }

//         // Create a user profile object (to match the backend schema)
//         const userProfile = {
//             username,
//             displayName,
//             email,
//             password,
//             profilePicture: profilePic
//         };

//         try {
//             // Send the user profile to the backend API
//             // Note: Changed port to 4000 to match server.js
//             const response = await fetch('http://localhost:4000/api/user', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(userProfile),
//             });

//             if (response.ok) {
//                 const result = await response.json();
//                 alert(result.message);
//                 console.log('User Profile Saved to MongoDB:', result.user);
//             } else {
//                 const error = await response.json();
//                 alert(`Error: ${error.message}`);
//                 console.error('Error Saving User Profile:', error);
//             }
//         } catch (err) {
//             console.error('Request failed:', err);
//             alert('Failed to save profile. Please try again later.');
//         }
//     });
// });


async function createProfile() {
    console.log('hi'); // For debugging purposes

    // Gather input values from the form
    const username = document.getElementById('username').value;
    const displayName = document.getElementById('display-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const profilePicInput = document.getElementById('profile-pic');

    // Simulate profile picture upload
    let profilePic = null;
    if (profilePicInput.files.length > 0) {
        profilePic = profilePicInput.files[0].name; // Just the file name for now
    }

    // Create a user profile object (to match the backend schema)
    const userProfile = {
        username,
        displayName,
        email,
        password,
        profilePicture: profilePic
    };

    try {
        // Send the user profile to the backend API
        const response = await fetch('http://localhost:5500/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userProfile),
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message);
            console.log('User Profile Saved to MongoDB:', result.user);
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
            console.error('Error Saving User Profile:', error);
        }
    } catch (err) {
        console.error('Request failed:', err);
        alert('Failed to save profile. Please try again later.');
    }
}
