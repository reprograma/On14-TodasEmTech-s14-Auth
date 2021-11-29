const tarefasSchema = require("../models/tarefasSchema")
const SECRET = process.env.SECRET
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const getAllTarefas = async (req, res) => {
    try {
        const tarefas = await tarefasSchema.find()

        res.status(200).json(
            [
                {
                    message : "Todas as tarefas:",
                    tarefas
                }
            ]
        )
        
    } catch (error) {
        res.status(500).json({message: error.message})        
    }
}

const createTarefa = async (req, res) => {
    try {
        const novaTarefaSchema = new tarefasSchema({
            descricao: req.body.descricao,
            concluido: req.body.concluido,
            nomeColaboradora: req.body.nomeColaboradora
        })

        if (!novaTarefaSchema.descricao){
            return res.status(406).json({
                message: "Preencher descrição da tarefa!"
            })
        }

        if (!novaTarefaSchema.nomeColaboradora){
            return res.status(406).json({
                message: "Preencher nome da colaboradora da tarefa!"
            })
        }

        const novaTarefaSalva = await novaTarefaSchema.save()

        res.status(201).json(
            [
                {
                    message: "Nova tarefa cadastrada com sucesso!",
                    novaTarefaSalva
                }
            ]
        )

    } catch (error) {
        res.status(500).json({message: error.message})        
    }
}

function checkToken(req, res, next) {
    
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
        return res.status(401).json({message: "Access denied!"});
    }

    try {
        const secret = process.env.SECRET;
        jwt.verify(token, secret);
        next();

    } catch (e) {
        return res.status(500).json({message: "Please enter a valid token!"});
    }
}


module.exports = {
    getAllTarefas,
    createTarefa,
    checkToken
}

