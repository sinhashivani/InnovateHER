document.addEventListener('DOMContentLoaded', () => {
    const createProfileBtn = document.getElementById('createProfileBtn');

    createProfileBtn.addEventListener('click', async () => {
        // Gather input values
        const username = document.getElementById('username').value;
        const displayName = document.getElementById('display-name').value;
        const email = document.getElementById('email').value; // Add email input in HTML
        const password = document.getElementById('password').value;
        const bio = document.getElementById('bio').value || ''; // Add bio input in HTML
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
            bio,
            profilePicture: profilePic,
            wantMessage: true,
            friends: [],
            blockedFriends: [],
        };

        try {
            // Send the user profile to the backend API
            const response = await fetch('http://localhost:3000/api/user', {
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
    });
});
