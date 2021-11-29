const express = require("express")
const router = express.Router()
const controller = require("../controller/tarefasController")

router.get("/all", controller.getAll)
router.post("/post", controller.postTarefa)

module.exports = router;