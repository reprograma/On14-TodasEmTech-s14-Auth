
const express = require("express");
const router = express.Router();
const controller = require("../controller/tarefasController");

router.get("/todastarefas", controller.checkToken, controller.getAllTarefas);
router.post("/criar", controller.checkToken, controller.createTarefa)

module.exports = router;