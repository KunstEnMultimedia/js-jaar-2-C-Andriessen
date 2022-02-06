const container = document.querySelector('.container')
renderMessageForm();

async function renderMessageForm() {
  const res = await fetch("/isLoggedIn", {
    method: "POST",
  });
  const isLoggedIn = await res.json();
  if (isLoggedIn) {
    const formEl = document.createElement("form");
    formEl.setAttribute("action", "/saveMessage");
    formEl.setAttribute("method", "POST");

    formEl.innerHTML = `
    <label class="form-label display-6 mb-3">Write your post</label>
    <textarea placeholder="Enter a message" name="message" class="form-control" rows="5"></textarea>
    <button type="submit" class="btn btn-primary mt-3">Save message</button>
    `;
    container.appendChild(formEl);
  }
}