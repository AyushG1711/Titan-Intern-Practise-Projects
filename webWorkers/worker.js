console.log("hi i am worker");
self.onmessage = (message) => {
  console.log(message);
  for (let i = 0; i < 10000000000; i++) {}
  self.postMessage("hey from worker");
};
