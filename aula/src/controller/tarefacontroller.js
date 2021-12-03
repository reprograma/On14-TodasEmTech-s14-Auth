const tarefaSchema = require("../models/tarefasSchema")
const SECRET = process.env.SECRET;
const jwt = require("jsonbtoken")
const bcrypt = require("bcrypt")

const getAllTasks = async (request, response) => {
    try {
        const tasks = await tarefaSchema.find();
        response.status(200).json({
            message: "All tasks found:",
            tasks,
        })
    } catch (e) {
        response.status(500).json({
            message: e.message,
        })
    }
};

const createTasks = async (request, response) => {
    try {
        const newTarefasSchema = new tarefaSchema({
            descricao: request.body.descricao,
            concluido: request.body.concluido,
            nomeColaboradora: request.body.nomeColaboradora,
        })
        if (!newTarefaSchema.descricao) {
            return response.status(406).json({
                message: "Preencher descrição",
            })
        }
        if (!newTarefasSchema.nomeColaboradora) {
            return response.status(406).json({
                message: "Preencher colaboradora",
            })
        }
        const savedNewTasks = await newTarefasSchema.save();
        response.status(200).json({
            message: "Tarefa cadastrada com sucesso",
            savedNewTasks,
        })
    } catch (e) {
        response.status(500).json({
            message: `verificar se preencheu o campo "concluido" corretamente utilizando "true" ou "false" ${e.message}`,
        })
    }
    }

    function checkToken(request, response, next) {
        const authHeader = require.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return response.status(401).json({
                message: "Acess denied",
            });
        }
        try{
            const secret = process.env.SECRET;
            jwt.verify(token, secret);
            next();
        } cath (e) {
            return response.status(500).json({
                message:"please enter a valid token!",
            });
        }
    }

    module.exports = {
        getAllTasks,
        createTasks,
        checkToken,
    };