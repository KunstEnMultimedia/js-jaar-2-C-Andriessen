const container = document.querySelector('.container');

renderLogoutBtn();

async function renderLogoutBtn() {
  const res = await fetch("/isLoggedIn", {
    method: "POST",
  });
  const isLoggedIn = await res.json();
  const btn = document.createElement("button");
  btn.className = "btn btn-danger"
  btn.innerText = "Log out";
  btn.addEventListener("click", requestLogout);
  if (isLoggedIn) {
      container.appendChild(btn);
  }
}

async function requestLogout() {
  await fetch("/logout", {
    method: "POST",
  });
  location.reload()
}