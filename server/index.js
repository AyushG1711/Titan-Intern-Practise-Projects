const webSocket = require("ws");
const wss = new webSocket.Server({ port: 4000 }); //server object

//wss is the server obj
wss.on("connection", (ws) => {
  //ws is the single TCP connection obj, therefore, send & listen events on this obj
  console.log(ws.readyState);
  ws.on("message", (data) => {
    console.log(ws.readyState, data + "");
    ws.send("got your msg!");
  });
  ws.on("close", (e) => {
    console.log("disconnect", ws.readyState);
  });
});
