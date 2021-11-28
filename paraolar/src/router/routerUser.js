const express = require('express')
const router = express.Router()

const userController = require('../controller/controllerUser')

//documentar minhas rotas:
//@route GET /api/user/
//@desc listar todos os usuários
//@acess.Public
router.get('/', userController.getAll)

//@route POST / api/user/cadasto
//@desc criar conta
//@access public
router.post('/cadastro', userController.cadastro)

//@route POST / api/user/login
//@desc acessar conta
//@access public
router.post('/login', userController.login)


module.exports = router
