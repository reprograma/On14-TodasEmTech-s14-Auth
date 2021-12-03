const express = require("express");
const router = express.Router();
const controller = require("../controller/tasksController");

router.get("/", controller.getAll);
router.post("/", controller.createTasks);


module.exports = router;