const express = require("express");
const router = express.Router();
const controller = require("../controller/tarefasController");

router.get("/", controller.getAll);
router.post("/", controller.createTarefas);


module.exports = router;