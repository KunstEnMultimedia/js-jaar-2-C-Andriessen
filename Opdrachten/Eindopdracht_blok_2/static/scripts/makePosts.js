renderMakePost();

async function renderMakePost() {
    const res = await fetch("/isLoggedIn", {
        method: "POST",
      });
      const isLoggedIn = await res.json();
      const post = document.createElement("a");
      post.innerText = "Make post";
      post.className = "fs-5"
      post.href = "/makePost.html"
      if (isLoggedIn) {
          container.appendChild(post);
      }
}