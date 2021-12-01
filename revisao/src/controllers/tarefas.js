const User = require('../models/tarefas');
const {hashPassword} = require('../helpers/auth') 
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')

const getAll = async(req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({ messagem: "Lista de pessoas", users })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const registerTarefas = async(req, res) => {
    const { descricao, dataInclusao, concluido, nomeColaboradora } = req.body
    try {
        const newtarefas = new User({
            descricao,
            dataInclusao,
            concluido,
            nomeColaboradora
        })
//Trato campo password para ser criptografado
const passwordHashed = await hashPassword(newtarefas.password, res )
newtarefas.password = passwordHashed

const saveUser = await newtarefas.save()
res.status(201).json({
    messagem: "Tarefa cadastrada com sucesso!",
    saveUser
})


    } catch (error) {
        res.status(500).json({
            message:error.message
        })

    }

}
module.exports = {
    getAll,
    registerTarefas
   
}