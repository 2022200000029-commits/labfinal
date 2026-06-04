const API_URL = "https://jsonplaceholder.typicode.com/comments";

const commentsContainer = document.getElementById("commentsContainer");

// Local state
let comments = [];

async function loadComments() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        comments = data;

        displayComments();
    } catch (error) {
        console.log("Error loading comments:", error);
    }
}

function displayComments() {
    commentsContainer.innerHTML = "";

    comments.forEach(comment => {
        const card = document.createElement("div");
        card.className = "card";
        card.id = `comment-${comment.id}`;

        card.innerHTML = `
            <h2>${comment.name}</h2>
            <p class="email">${comment.email}</p>
            <p class="body">${comment.body}</p>
            <button class="delete-btn" onclick="deleteComment(${comment.id})">
                Delete
            </button>
        `;

        commentsContainer.appendChild(card);
    });
}

async function deleteComment(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            comments = comments.filter(comment => comment.id !== id);

            const card = document.getElementById(`comment-${id}`);
            card.remove();
        }
    } catch (error) {
        console.log("Error deleting comment:", error);
    }
}

loadComments();