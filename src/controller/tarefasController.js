const Tarefa = require("../models/tarefas")
const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const getAll = async (req, res) => {
    try {
        const tarefasAll = await Tarefa.find()
        res.status(200).json({ messagem: "Lista de tarefas", tarefasAll})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
  };

const postTarefa = (req, res) => {
    const senhaComHash = bcrypt.hashSync(req.body.password, 10)//depois da virgula fica o nível de salt
    req.body.password = senhaComHash
  
    let tarefa = new Tarefa(req.body);
      tarefa.save(function(err){
      if (err) res.status(500).send({ message: err.message })
  
      res.status(201).send(tarefa.toJSON());
    })
  };

module.exports= {
    getAll,
    postTarefa
}