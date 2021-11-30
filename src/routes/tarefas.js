const express = require("express");
const router = express.Router();
const controller = require("../controller/taferasController");

router.get("/", controller.getAllTarefas);
router.post("/create", controller.postTarefa);
router.post("/", controller.validacao);

module.exports = router;