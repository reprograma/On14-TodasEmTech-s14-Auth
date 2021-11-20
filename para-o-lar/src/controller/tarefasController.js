const tarefaSchema = require("../models/tarefasSchema");
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAll = async (req, res) => {
    console.log(req.url);
    tarefasSchema.find(function (err, tarefasSchema){
      res.status(200).send(tarefasSchema)
    })     
};


const criarNovaTarefa = async (req, res) => {
    console.log(req.body);

    let tarefa = new tarefasSchema(req.body);
    tarefa.save(function(err){
      if (err) res.status(500).send({ message: err.message })
  
      res.status(201).send(tarefa.toJSON());
    })
  };

function Token(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ");

  if (!token) {
    return res.status(401).json({
      message: "Acesso Negado.",
    });
  }
  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();
  } catch (e) {
    return res.status(500).json({
      message: "Insira um token válido!",
    });
  }
}

module.exports = {
  getAll,
  criarNovaTarefa,
  Token,
};