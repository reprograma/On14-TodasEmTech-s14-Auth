const Tarefa = require("../models/tarefa")
const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const getAll = async (req, res) => {
    try {
        const tarefas = await Tarefa.find()
        res.status(200).json({ messagem: "Lista de pessoas", tarefas })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    } 
};


const criarTarefa = (req, res) => {
    const senhaHash = bcrypt.hashSync(request, body, senha, 10)
    req.body.password = senhaHash

    let tarefa = new Tafera(req.body);
    tarefa.save(function(err){
    if (err) res.status(500).send({ message: err.message })

    res.status(201).send(tarefa.toJSON());
  })
};




module.exports = {
    getAll,
    criarTarefa
}