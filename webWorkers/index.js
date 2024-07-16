const worker = new Worker("worker.js");
let sumBtn = document.getElementById("sum");
let changeBgBtn = document.getElementById("change_bg");
sumBtn.addEventListener("click", (e) => {
  worker.postMessage("compute the sum");
});
worker.onmessage = (message) => {
  console.log(message);
};
changeBgBtn.addEventListener("click", (e) => {
  console.log("1");
});
