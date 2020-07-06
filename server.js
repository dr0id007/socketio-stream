const express = require("express");
const app = express();
const path = require("path");
const server = require("http").Server(app);

const cv = require("opencv4nodejs");

const io = require("socket.io")(server);

const wCap = new cv.VideoCapture(0);
wCap.set(cv.CAP_PROP_FRAME_WIDTH, 300);
wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 300);

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname + "/index.html"));
});

setInterval(() => {
  const frame = wCap.read();
  const image = cv.imencode(".jpg", frame).toString("base64");
  io.emit("test12", image);
}, 1000 / 16);

server.listen(process.env.PORT || 4000);
