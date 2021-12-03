const express = require('express')
const router = express.Router()

const userController = require('../controller/user')

//@route GET /api/users/
//@desc Listar todos os usuários
//@access Public
router.get('/', userController.getAll)

//@router POST /api/users/register
//@desc Criar conta
//@acess Public
router.post('/register', userController.register)


//@router POST /api/users/login
//@desc Criar conta
//@acess Public
router.post('/login', userController.login)

module.exports = router