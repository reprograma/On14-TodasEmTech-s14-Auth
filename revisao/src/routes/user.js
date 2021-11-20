const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

//@route GET /api/users/
//@desc Listar todos os usuários
//@access Public
router.get('/', userController.getAll)

module.exports = router