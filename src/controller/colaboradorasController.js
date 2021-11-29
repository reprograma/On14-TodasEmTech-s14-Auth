const colaboradoras = require("../models/colaboradoras")
const SECRET = process.env.SECRET
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const getAll = (req, res) => {

  const authHeader = req.get("authorization")

  if (!authHeader) {
    return res.status(401).send('erro no header');
  }

  const token = authHeader.split(' ')[1]  

  jwt.verify(token, SECRET, function(err, payload) {
    if (err){
      return res.status(405).send({"message": "Não autorizado"})
    }
  
    colaboradoras.find({email: payload.email}, function(err, colaboradora) {
      res.status(200).send(colaboradora)
    })

  })
  
};


const postColaboradora = (req, res) => {
  const senhaComHash = bcrypt.hashSync(req.body.password, 10)
  req.body.password = senhaComHash

  let colaboradora = new colaboradoras(req.body);
    colaboradora.save(function(err){
    if (err) res.status(500).send({ message: err.message })

    res.status(201).send(colaboradora.toJSON());
  })
};

const login = (req, res) => {

  colaboradoras.findOne(({email: req.body.email}), function(erro, colaboradora){

    if (!colaboradora){
      return res.status(404).send(`Não existe colaboradora com o email ${req.body.email}`)
    }

    const senhaValida = bcrypt.compareSync(req.body.password, colaboradora.password);

    if (!senhaValida) {
      return res.status(403).send(`que senha é essa hein`);
    }

    const token = jwt.sign({ email: req.body.email }, SECRET);


    return res.status(200).send({"message": "Tudo certo, nada errado.", token})

  })  
}




module.exports = {
    getAll,
    postColaboradora,
    login
}
