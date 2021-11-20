const tarefaSchema = require("../models/tarefasSchema");
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await tarefaSchema.find();
    res.status(200).json({
      message: "All tasks found:",
      tasks,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const createTasks = async (req, res) => {
  try {
    const newTarefasSchema = new tarefaSchema({
      descricao: req.body.descricao,
      concluido: req.body.concluido,
      nomeColaboradora: req.body.nomeColaboradora,
    });
    if (!newTarefasSchema.descricao) {
      return res.status(406).json({
        message: "Preencher descrição.",
      });
    }

    if (!newTarefasSchema.nomeColaboradora) {
      return res.status(406).json({
        message: "Preencher colaboradora.",
      });
    }
    const savedNewTasks = await newTarefasSchema.save();
    res.status(200).json({
      message: "Tarefa cadastrada com sucesso:",
      savedNewTasks,
    });
  } catch (e) {
    res.status(500).json({
      message: `Verificar se preencheu o campo "concluido" corretamente utilizando "true" ou "false" ${e.message} `,
    });
  }
};

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access denied!",
    });
  }
  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();
  } catch (e) {
    return res.status(500).json({
      message: "Please enter a valid token!",
    });
  }
}

module.exports = {
  getAllTasks,
  createTasks,
  checkToken,
};
