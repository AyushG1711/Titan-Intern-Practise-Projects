const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", (req, res, next) => {
  console.log("done", req.body);
  return res.status(200).json({ data: req.body, message: "error" });
});
app.listen("8080", (err) => {
  if (err) {
    console.log("Server could not be started");
  } else {
    console.log("Server is running at port", 8080);
  }
});
