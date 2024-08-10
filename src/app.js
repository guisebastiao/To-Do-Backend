const express = require("express");
const cors = require("cors");

const loginRoutes = require("./routes/loginRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use("/login", loginRoutes);
    this.app.use("/task", taskRoutes);
    this.app.use("/user", userRoutes);
  }
}

module.exports = new App().app;
