const express = require("express");
const router = express.Router();
const controller = require("../controller/tarefasController");

router.get("/all", controller.Token, controller.getAll);
router.post("/criar", controller.Token, controller.criarNovaTarefa);

module.exports = router
