
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

//AdminBro
const AdminBro = require('admin-bro')
const expressAdminBro = require('@admin-bro/express')
const mongooseAdminBro = require('@admin-bro/mongoose')

//AdminBroModels
const User = require('./models/User.model')
const Category = require('./models/Category.model')
const Product = require('./models/Product.model')



AdminBro.registerAdapter(mongooseAdminBro)
const AdminBroOptions = {resources: [User, Category, Product], options: {
  
}}

const adminBro = new AdminBro(AdminBroOptions)
const router = expressAdminBro.buildRouter(adminBro)
app.use(adminBro.options.rootPath, router)

app.get('/admin', (req, res)=>{
  // res.send('Dashboard con Node')
})


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
})

mongoose
  .connect(process.env.MONGO_SERVER)
  .then(() => console.log("Успешное подключение к MongoDB!"))
  .catch(() => console.log("Ошибка при подключении к MongoDB!"));

server.listen(process.env.SERVER_PORT, () => {
  console.log(`Сервер на порту: ${process.env.SERVER_PORT} успешно запущен!`);
});