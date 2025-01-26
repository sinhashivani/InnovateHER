// class Comment {
//     constructor(caption, commenterUserName = null, commenterProfilePicture = null) {
//         this.caption = caption;
//         this.votes = 0;
//         this.commentID = null; // Unique comment ID (e.g., "1234,2345,3456")
//         this.postDate = new Date(); // Current date
//         this.likedUsers = []; // Array of users who liked this comment
//         this.dislikedUsers = []; // Array of users who disliked this comment
//         this.commenterUserName = commenterUserName;
//         this.commenterProfilePicture = commenterProfilePicture; // Could be a URL or Base64 in JavaScript
//         this.gatekeeper = {}; // Placeholder for synchronization (not typically needed in JS)
//     }

//     // Equality check
//     equals(other) {
//         if (!(other instanceof Comment)) return false;
//         return (
//             this.votes === other.votes &&
//             this.caption === other.caption &&
//             JSON.stringify(this.likedUsers) === JSON.stringify(other.likedUsers) &&
//             JSON.stringify(this.dislikedUsers) === JSON.stringify(other.dislikedUsers) &&
//             this.postDate.toISOString() === other.postDate.toISOString()
//         );
//     }

//     // Getters and setters
//     getLikedUsers() {
//         return [...this.likedUsers]; // Return a copy to prevent mutation
//     }

//     addLikedUser(user) {
//         if (this.likedUsers.includes(user)) {
//             return false;
//         }
//         this.likedUsers.push(user);
//         return true;
//     }

//     removeLikedUser(user) {
//         const index = this.likedUsers.indexOf(user);
//         if (index !== -1) {
//             this.likedUsers.splice(index, 1);
//             return true;
//         }
//         return false;
//     }

//     getDislikedUsers() {
//         return [...this.dislikedUsers];
//     }

//     addDislikedUser(user) {
//         if (this.dislikedUsers.includes(user)) {
//             return false;
//         }
//         this.dislikedUsers.push(user);
//         return true;
//     }

//     removeDislikedUser(user) {
//         const index = this.dislikedUsers.indexOf(user);
//         if (index !== -1) {
//             this.dislikedUsers.splice(index, 1);
//             return true;
//         }
//         return false;
//     }

//     getCommentID() {
//         return this.commentID;
//     }

//     setCommentID(commentID) {
//         this.commentID = commentID;
//     }

//     getComment() {
//         return this.caption;
//     }

//     editCaption(newCaption) {
//         if (newCaption && newCaption.trim() !== '') {
//             this.caption = newCaption;
//         }
//     }

//     getCommentLikes() {
//         return this.votes;
//     }

//     incrementCommentLikes() {
//         this.votes++;
//     }

//     decrementCommentLikes() {
//         if (this.votes > 0) {
//             this.votes--;
//         }
//     }

//     getPostDate() {
//         return this.postDate;
//     }

//     getCommenterUserName() {
//         return this.commenterUserName;
//     }

//     getCommenterProfilePicture() {
//         return this.commenterProfilePicture;
//     }
// }
