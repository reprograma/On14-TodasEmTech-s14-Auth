const express = require("express");
const router = express.Router();
const controller = require("../controller/tarefasController");

router.get("/allTasks", controller.checkToken, controller.getAllTasks);
router.post("/create/tasks", controller.checkToken, controller.createTasks);

module.exports = router;
