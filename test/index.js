const pr = new Promise((res, rej) => {
  setTimeout(() => {
    res(2);
  }, 5000);
});
pr.then((v) => {
  console.log(v);
});
const id = setTimeout(() => {
  console.log(4);
}, 2000);
console.log(id, 444);
