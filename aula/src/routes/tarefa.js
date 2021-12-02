const express = require("express");
const router = express.Router();
const controller = require("../controller/tarefaController");

router.get("/", controller.getAll);
router.post("/", controller.criarTarefa);


module.exports = router;