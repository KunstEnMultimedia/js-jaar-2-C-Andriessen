const container = document.querySelector('.container');
renderMessageList();

async function renderMessageList() {
  const messageRes = await fetch("/messages");
  const messages = await messageRes.json();
  const commentRes = await fetch("/comments");
  const comments = await commentRes.json();
  console.log(messages);

  messages.sort((a, b) => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);

    if (aDate < bDate) return 1;
    else return -1;
  });

  const messageContainer = document.createElement("div");
  messages.forEach((message) => {
    const messageEl = document.createElement("div");
    messageEl.innerHTML = `<span class="display-6">${message.user.email}</span>
    <div class="row mt-3">
    <p class="fs-5 col-1"><span class="fw-bold">Likes: </span>${message.likes}</p>
    <p class="fs-5 col-2"><span class="fw-bold">Dislikes: </span>${message.dislikes}</p>
    </div>
    <hr>
    <p class="fs-5 mb-5 mt-2">${message.message}</p>`

    comments.forEach((comment) => {
      if(comment.message._id === message._id) {
        messageEl.innerHTML += `
        <div class="card mb-3">
        <div class="card-body">
        <span><b>Comment by: </b> ${comment.user.email}</span>
        <p>${comment.comment}</p>
        </div>
        </div>`
      }
    });

    messageEl.innerHTML+= `<form action="/saveComment" method="post">
    <input type="hidden" name="messageId" value="${message._id}">
    <textarea placeholder="Write a comment" name="comment" class="form-control mb-3 mt-5"></textarea>
    <button type="submit" class="btn btn-primary mb-3">Place comment</button>
    </form>
    <div class="row">
    <div class="col-1">
    <form action="/vote" method="post" id="like">
    <input type="hidden" name="messageId" value="${message._id}">
    <input type="hidden" name="like" value="true">
    <input type="hidden" name="dislike" value="false">
    <button type="submit" class="btn btn-success">Like</button>
    </form>
    </div>
    <div class="col-1">
    <form action="/vote" method="post" id="dislike">
    <input type="hidden" name="messageId" value="${message._id}">
    <input type="hidden" name="dislike" value="true">
    <input type="hidden" name="like" value="false">
    <button type="submit" class="btn btn-danger mb-4">Dislike</button>
    </form>
    </div>
    </div>
    `;
    messageEl.innerHTML += '<hr />'
    
    messageContainer.append(messageEl);
  });
  container.append(messageContainer);
}