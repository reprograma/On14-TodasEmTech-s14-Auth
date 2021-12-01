const express = require('express')
const router = express.Router()

const tarefasController = require('../controllers/tarefas')

//@route GET /api/users/
//@desc Listar todos os usuários
//@access Public
router.get('/', tarefasController.getAll)

//@route POST api/users/register
//@des Acessar criar conta
//@acess public

router.post('/registerTarefas', tarefasController.registerTarefas)




module.exports = router