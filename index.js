const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
app.use(cors());
app.use(express.json());


app.use(require("./routes/category.route"));
app.use(require("./routes/product.route"));
app.use(require('./routes/user.route'));

mongoose
  .connect(process.env.MONGO_SERVER)
  .then(() => console.log("Успешное подключение к MongoDB!"))
  .catch(() => console.log("Ошибка при подключении к MongoDB!")); 

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Сервер на порту: ${process.env.SERVER_PORT} успешно запущен!`);
});

