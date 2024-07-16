let signUp = document.getElementById("signUp");
let logIn = document.getElementById("logIn");
let email = document.getElementById("email");
let password = document.getElementById("password");
const handler = async (e) => {
  try {
    e.preventDefault();
    const body = { email: email.value, password: password.value };
    const url = "http://localhost:8080";
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      //   const { token } = res.data;
      //   setTokenInLS(token);
      window.location.href = "http://localhost:5500/frontend/home.html";
    } else {
      throw new Error("Token not found");
    }
  } catch (err) {
    alert("try again");
  }
};
signUp.addEventListener("click", handler);
logIn.addEventListener("click", handler);
const setTokenInLS = (token) => {
  localStorage.setItem(token, token);
};
