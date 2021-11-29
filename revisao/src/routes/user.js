// requerindo o express
const express = require('express')
// utilizando  na  routes 
const router = express.Router()
// abilitando o controller
const userController = require('../controllers/user')

//Documentar o comportamento  rota 
//@route POST n/ api /users/
//@desc Lista  Trazer todos os usuários 
//@access public
router.get('/', userController.getAll)

//@route POST n/ api /users/register
//@desc criar   conta 
//@access public
router.post('/registrer', userController.registrer)

//@route POST n/ api /users/loguin 
//@desc acessar conta 
//@access public
router.post('/login', userController.login)

module.exports = router