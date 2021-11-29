const express = require("express");
const router = express.Router();
const controller = require("../controller/terafaController")

//@route GET /tarefas/all
//@desc Listar todos os usuarios
//@access Public
router.get("/all", controller.getAll);
router.post("/new-task", controller.createTask);

module.exports = router;