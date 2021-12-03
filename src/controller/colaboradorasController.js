const colaboradoras = require("../models/colaboradoras")
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")


const getAll = (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(" ")[1];
  console.log('Header:', token);
  if (!authHeader) {
    return res.status(401).send('Erro no header');
  }
  jwt.verify(token, SECRET, function(erro) {
    if (erro) {
      return res.status(403).send('Não autorizado');
    }

    colaboradoras.find(function (err, colaboradoras){
      res.status(200).send(colaboradoras)
    })     
  })
};


const postColaboradora = (req, res) => {
  const senhaHash = bcrypt.hashSync(req.body.password, 10)
  req.body.password = senhaHash

  let colaboradora = new colaboradoras(req.body);
    colaboradora.save(function(err){
    if (err) res.status(500).send({ message: err.message })

    res.status(201).send(colaboradora.toJSON());
  })
};

const login = (req, res) => {
  const { email, password } = req.body;
  try {
      const colaboradora =  colaboradoras.findOne({ email: email })

      if (!colaboradora) {
          return res.status(404).send({ message: "Email inválido" })
      }
      const checkPassword =  bcrypt.compare(password, colaboradora.password)

      if (!checkPassword) {
          return res.status(404).send({ message: "Senha inválida" })
      }


      const token = jwt.sign({ name:colaboradora.name }, SECRET);

      res.status(200).json({
          message: "Login feito sucesso!",
          token
      })

  } catch (error) {
      res.status(500).json({
          message: error.message
      })
  }
}


module.exports = {
    getAll,
    postColaboradora,
    login
}