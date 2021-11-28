const colaboradoras = require("../models/colaboradoras");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET = process.env.SECRET;

const getAll = (req, res) => {
  console.log(req.url);

  const authHeader = req.get('authorization');
  const token = authHeader.split(' ')[1]

  if (!authHeader) {
    return res.status(401).send('erro no header')
  }

  jwt.verify(token, SECRET, function(erro){
    if (erro) {
      return res.status(405).send("Não autorizado.");
    }
    
    colaboradoras.find(function (err, colaboradoras){
      res.status(200).send(colaboradoras)
    })
  });    
};

const postColaboradora = (req, res) => {
  const senhaComHash = bcrypt.hashSync(req.body.password, 10);
  
  req.body.password = senhaComHash;

  let colaboradora = new colaboradoras(req.body);
  
  colaboradora.save(function(err){
    if (err) res.status(500).send({ message: err.message })

    res.status(201).send(colaboradora.toJSON());
  })
};

const login = (req, res) => {
  colaboradoras.findOne(({email: req.body.email}), function(erro, colaboradora) {
    if(!colaboradora) {
      return res.status(404).send(`Não existe colaboradora com o email ${req.body.email}`);
    }

    const senhaValida = bcrypt.compareSync(req.body.password, colaboradora.password);

    if (!senhaValida) {
      return res.status(403).send(`que senha é essa`)
    }

    const token = jwt.sign({email: req.body.email}, SECRET)

    res.status(200).send(`Tudo certo, nada errado.`)
  })
}

module.exports = {
  getAll,
  postColaboradora,
  login
}
