import { Post } from './Post.js';

document.addEventListener('DOMContentLoaded', () => {
    const postContainer = document.getElementById('post-container');
    const photoInput = document.getElementById('photo');
    const captionInput = document.getElementById('caption');
    const addPostButton = document.getElementById('add-post');

    const posts = [];

    addPostButton.addEventListener('click', () => {
        const photo = photoInput.value;
        const caption = captionInput.value;

        if (photo && caption) {
            const newPost = new Post(photo, caption);
            posts.push(newPost);

            postContainer.innerHTML += newPost.render();
            photoInput.value = '';
            captionInput.value = '';
        }
    });
});
