const Task = require("../models/tarefasSchema")
const colaboradoras = require("../models/colaboradoras")
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const getAll = (req, res) => {
  const authHeader = req.get("authorization") 
  if (!authHeader) {
    return res.status(401).send('erro no header');
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET, function(err, payload) {

    if (err){
      return res.status(405).send({"message": err.message})
    }
    Task.find(function(err, tarefas) {
      res.status(200).send(tarefas)
    })
      
    
  })
};


const createTask = async (req, res) => {
const { id, descricao, dataInclusao, nomeColaboradora} = req.body
 try {
  
    const newTask = new Task({
      id,
      descricao,
      dataInclusao,
      nomeColaboradora
    })

    const saveTask = await newTask.save()
    res.status(201).json({
      messagem: "Pessoa cadastrada com sucesso",
       newTask})

  } catch (erro) {
    res.status(500).json({
     message: erro.message
  })
  }

}

module.exports = {
  getAll,
  createTask
}