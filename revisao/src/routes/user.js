const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')
const { checkAuth } = require('../middlewares/auth')

//@route GET /api/users/
//@desc Listar todos os cadastros
//@access Public
router.get('/', userController.getAll)

//@route GET /api/users/:id
//@desc Listar todos os cadastros
//@access Private
router.get('/:id', checkAuth, userController.getAll)

//@route POST /api/users/register
//@desc Criar conta
//@access Public
router.post('/register', userController.register)

//@route POST /api/users/login
//@desc Acessar conta
//@access Public
router.post('/login', userController.login)

//@route GET /api/users/
//@desc Acessar conta
//@access Public
router.post('/login', userController.login)


module.exports = router