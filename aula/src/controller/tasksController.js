const tasks = require("../models/tasks")
const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const getAll = (req, res) => {
    const authHeader = req.get('authorization');
    const token = authHeader.split(' ')[1];
    console.log('Meu header:', token);
    if (!authHeader) {
      return res.status(401).send('erro no header');
    }
    jwt.verify(token, SECRET, function(erro) {
      if (erro) {
        return res.status(403).send('Não autorizado');
      }
  
      tasks.find(function (err, tasks){
        res.status(200).send(tasks)
      })     
    })   
};


const createTasks = (req, res) => {
    const senhaHash = bcrypt.hashSync(request, body, senha, 10)
    req.body.password = senhaHash

    let task = new tasks(req.body);
    task.save(function(err){
    if (err) res.status(500).send({ message: err.message })

    res.status(201).send(task.toJSON());
  })
};




module.exports = {
    getAll,
    createTasks
}