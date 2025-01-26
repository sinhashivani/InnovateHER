export class Post {
    constructor(photo, caption) {
        this.photo = photo;
        this.caption = caption;
        // this.likeCount = 0;
        // this.likedUsers = [];
        // this.comments = [];
    }

    // Public methods
    // likePost(user) {
    //     if (!this.likedUsers.includes(user)) {
    //         this.likedUsers.push(user);
    //         this.likeCount++;
    //     }
    // }

    // addComment(comment) {
    //     this.comments.push(comment);
    // }

    render() {
        return `
        <div class="post">
            <img src="${this.photo}" alt="Post Photo">
            <p>${this.caption}</p>
            <ul>
                ${this.comments.map(comment => `<li>${comment}</li>`).join("")}
            </ul>
        </div>
        `;
    }
}
