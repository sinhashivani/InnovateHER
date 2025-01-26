class UserProfile {
    constructor(username, displayName, email, password, profilePicture) {
        this.username = username;
        this.displayName = displayName;
        this.email = email;
        this.password = password;
        this.wantMessage = true; // Default value
        this.profilePicture = profilePicture || null;
        this.userID = UserProfile.generateUniqueUserID();
        this.posts = new Map();
        this.friends = [];
        this.blockedFriends = [];
    }

    // Static method to generate a unique user ID
    static generateUniqueUserID() {
        return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    }

    // Getters and Setters
    getUsername() {
        return this.username;
    }

    setUsername(username) {
        this.username = username;
    }

    getDisplayName() {
        return this.displayName;
    }

    setDisplayName(displayName) {
        this.displayName = displayName;
    }

    getEmail() {
        return this.email;
    }

    setEmail(email) {
        this.email = email;
    }

    getPassword() {
        return this.password;
    }

    setPassword(password) {
        this.password = password;
    }

    getWantMessage() {
        return this.wantMessage;
    }

    setWantMessage(wantMessage) {
        this.wantMessage = wantMessage;
    }

    getProfilePicture() {
        return this.profilePicture;
    }

    setProfilePicture(profilePicture) {
        this.profilePicture = profilePicture;
    }

    getUserID() {
        return this.userID;
    }

    getPosts() {
        return Array.from(this.posts.values());
    }

    addPost(post) {
        if (!post) return null;

        let postID;
        do {
            postID = `${this.userID},${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`;
        } while (this.posts.has(postID));

        this.posts.set(postID, post);
        post.setPostID(postID);
        return postID;
    }

    removePost(postID) {
        return this.posts.delete(postID);
    }

    getFriends() {
        return [...this.friends];
    }

    addFriend(friendID) {
        if (!this.friends.includes(friendID)) {
            this.friends.push(friendID);
            return true;
        }
        return false;
    }

    removeFriend(friendID) {
        const index = this.friends.indexOf(friendID);
        if (index !== -1) {
            this.friends.splice(index, 1);
            return true;
        }
        return false;
    }

    getBlockedFriends() {
        return [...this.blockedFriends];
    }

    blockUser(userID) {
        if (!this.blockedFriends.includes(userID)) {
            this.blockedFriends.push(userID);
            return true;
        }
        return false;
    }

    unblockUser(userID) {
        const index = this.blockedFriends.indexOf(userID);
        if (index !== -1) {
            this.blockedFriends.splice(index, 1);
            return true;
        }
        return false;
    }

    // Convert the user profile to a string for storage or display
    toString() {
        return `${this.username},${this.displayName},${this.email},${this.password},${this.wantMessage}`;
    }

    // Check equality with another UserProfile
    equals(other) {
        if (!(other instanceof UserProfile)) return false;

        return (
            this.username === other.username &&
            this.displayName === other.displayName &&
            this.email === other.email &&
            this.password === other.password &&
            JSON.stringify(this.profilePicture) === JSON.stringify(other.profilePicture)
        );
    }
}

module.exports = UserProfile;
