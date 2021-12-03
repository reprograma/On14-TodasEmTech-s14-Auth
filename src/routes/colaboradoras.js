const express = require("express")
const router = express.Router()
const controller = require("../controller/colaboradorasController")

router.get("/all", controller.getAll)
router.post("/create", controller.postColaboradora)
router.post("/login", controller.login)

module.exports = router;