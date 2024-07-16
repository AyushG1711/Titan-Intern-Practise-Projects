let fileElement = document.getElementById("file-upload");
let logOut = document.getElementById("logout");
let image = document.getElementById("image");
fileElement.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch("http://localhost:8080", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: JSON.stringify(formData),
  });
  console.log(res);
  alert("file uploaded");
  const url = window.URL.createObjectURL(file);
  console.log(url);
  image.src = url;
});
logOut.addEventListener("click", (e) => {
  localStorage.clear();
  window.location.href = window.location.origin + "/frontend/index.html";
});
