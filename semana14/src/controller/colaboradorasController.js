//const  JsonWebTokenError = require("jsonwebtoken");
const colaboradoras = require("../models/colaboradoras")
const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken');



const getAll = (req, res) => {
  console.log(req.url);

  const authHeader = req.get('Authorization')
  const token = authHeader.split('')[1]
  console.log('Meu header: ', token);


  if (!token){
    return res.status(401).send('erro no Heard')
  }

 jwt.verify(token, SECRET, function(erro){

  if(erro) {
    return res.status(405).send('Não autorizado')
  }
 colaboradoras.find(function (err, colaboradoras){
      res.status(200).send(colaboradoras)
 })
    })     
  
};

const postColaboradora = (req, res) => {
 const senhaComHash = bcrypt.hashSync

  let colaboradora = new colaboradoras(req.body);
    colaboradora.save(function(err){
    if (err) res.status(500).send({ message: err.message })

    res.status(201).send(colaboradora.toJSON());
  })
};




module.exports = {
    getAll,
    postColaboradora,
}
