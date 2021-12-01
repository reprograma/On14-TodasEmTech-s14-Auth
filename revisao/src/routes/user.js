const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

//@route GET /api/users/
//@desc Listar todos os usuários
//@access Public
router.get('/', userController.getAll)

//@route POST api/users/register
//@des Acessar criar conta
//@acess public

router.post('/register', userController.register)

//@route POST api/users/
//@des Acessar criar conta
//@acess public
router.post('/login', userController.login)

module.exports = router