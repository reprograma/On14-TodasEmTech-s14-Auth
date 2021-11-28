const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

//documentação da rota: 
//@route POST /api/users/
//@desc Listar todos os usuários
//@access Public
router.get('/', userController.getUsers);

//@route POST /api/users/register
//@desc Criar conta
//@access Public
router.post('/register', userController.register);

//@route POST /api/users/login
//@desc Acessar conta
//@access Public
router.post('/login', userController.login);

module.exports = router;