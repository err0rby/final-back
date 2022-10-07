require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(require("./routes/category.route"));
app.use(require("./routes/product.route"));
app.use(require('./routes/user.route'));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})


io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("disp_pat", (data) => {
    io.emit("receive", data)
  })
});

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_SERVER)
    console.log("Успешное подключение к MongoDB!")
  } catch (error) {
    console.log("Ошибка при подключении к MongoDB!")
  }
}

server.listen(process.env.SERVER_PORT, () => {
  console.log(`Сервер на порту: ${process.env.SERVER_PORT} успешно запущен!`);
});

start();