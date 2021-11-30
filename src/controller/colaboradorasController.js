const colaboradoras = require("../models/colaboradoras")
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")


const getAll = (req, res) => {
  console.log(req.url);
  colaboradoras.find(function (err, colaboradoras){
    res.status(200).send(colaboradoras)
  })

  const authHeader = req.get("authorization")
  if (!authHeader) {
    return res.status(401).send('erro no header')
  }   

const token = authHeader.split('')[1];
// verifica se token- sequencia de dados criptografados e a secret-chave RSA do jwt; tem o mesmo codigo que é verificado abaixo
// RSA: criptografia do secret 
//payload: usuário
jwt.verify(token, SECRET, function(err, payload) {
 
  if (err){
    return res.status(405).send({"message": err.message})
  }

  colaboradoras.find({email: payload.email}, function(err, colaboradora) {
    res.status(200).send(colaboradora)
  })

  })
};

const postColaboradora = (req, res) => {
  
  console.log(req.body);
  const senhaComHash = bcrypt.hashSync(req.body.password, 10);
  req.body.password = senhaComHash;

  let colaboradora = new colaboradoras(req.body);
    colaboradora.save(function(err){
    })
};
  //10 salt quantidade de caracteres na criptografia
  //console.log(req.body);
// hash é a senha criptografada
 

const login = (req, res) => {
  colaboradoras.findOne(({ email: req.body.email}),
  function(err, colaboradoras) {
    if(!colaboradoras){
      return res.status(404).send(`Não existe  colaboradora com email ${req.body.email}`);
    }
     
  const senhaValida = bcrypt.compareSync(req.body.password, colaboradoras.password);
    // compara senhas uma cripstografia com outra, se a senha for igual true, se diferente false
 
  if(!senhaValida) {
      return res.status(403).send(`que senha é essa`);
    }

  const payload = {
    email: colaboradoras.email,
    nome: colaboradoras.name
  } 
    
  const token = jwt.sign(payload, SECRET);
      return res.status(200).send(token);

  });
}

 
  // token por default por padrão

module.exports = {
    getAll,
    postColaboradora,
    login
}
