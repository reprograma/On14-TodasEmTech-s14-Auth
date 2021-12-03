const express = require("express");
const routes = express.Router();
const controller = require("../controller/tarefasController");

routes.get("/", controller.getAll);
routes.post("/", controller.create);


module.exports = routes;