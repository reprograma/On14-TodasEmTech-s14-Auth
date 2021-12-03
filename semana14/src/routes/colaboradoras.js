const express = require("express")
const router = express.Router()
const controller = require("../controller/colaboradorasController")

router.get("/", controller.getAll)
router.post("/", controller.postColaboradora)

module.exports = router;