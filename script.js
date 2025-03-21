document.addEventListener("DOMContentLoaded", () => {
    const postList = document.getElementById("postList");
    const newPostBtn = document.getElementById("newPostBtn");
    const postModal = document.getElementById("postModal");
    const closeBtn = document.querySelector(".close");
    const postSubmit = document.getElementById("postSubmit");
    const postTitle = document.getElementById("postTitle");
    const postContent = document.getElementById("postContent");

    function loadPosts() {
        postList.innerHTML = "";
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts.forEach((post, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${post.title}</strong> - ${post.content} 
                            <span class="delete" onclick="deletePost(${index})">❌</span>`;
            postList.appendChild(li);
        });
    }

    postSubmit.addEventListener("click", () => {
        const title = postTitle.value.trim();
        const content = postContent.value.trim();
        if (title && content) {
            const posts = JSON.parse(localStorage.getItem("posts")) || [];
            posts.push({ title, content });
            localStorage.setItem("posts", JSON.stringify(posts));
            loadPosts();
            postModal.style.display = "none";
            postTitle.value = "";
            postContent.value = "";
        }
    });

    window.deletePost = function(index) {
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts.splice(index, 1);
        localStorage.setItem("posts", JSON.stringify(posts));
        loadPosts();
    };

    newPostBtn.addEventListener("click", () => postModal.style.display = "block");
    closeBtn.addEventListener("click", () => postModal.style.display = "none");

    window.onclick = function(event) {
        if (event.target == postModal) {
            postModal.style.display = "none";
        }
    };

    loadPosts();
});
