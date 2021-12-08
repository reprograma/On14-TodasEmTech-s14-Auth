const colaboradoras = require("../models/colaboradoras")
const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const getAll = async(req, res) => {

  try{
    const colaboradora = await colaboradoras.find()
    
    res.status(200).json({messagem:"Lista de pessoas", colaboradora})
   
}   catch (error){
    res.status(500).json({
        message: error.message
    })
}
};


const postColaboradora = (req, res) => {
 const senhaComhash = bcrypt.hashSync(req.body.password,10)
 req.body.password = senhaComhash

  let colaboradora = new colaboradoras(req.body);
    colaboradora.save(function(err){
    if (err) res.status(500).send({ message: err.message })

    res.status(201).send(colaboradora.toJSON());
  })
};


const login = (req, res) => {
  colaboradoras.findOne(({ email: req.body.email}), function(err, colaboradoras) {
    if(!colaboradoras) {
      return res.status(404).send(`Não existe colaboradora com o email ${req.body.email}`);
    } 
    const senhaValida = bcrypt.compareSync(req.body.password, colaboradoras.password);
    if(!senhaValida){
      return res.status(403).send(`que senha é essa hein`);

    }
    const token = jwt.sign({ email: req.body.email})

    return res.status(200).send(token);
  });

}



module.exports = {
    getAll,
    postColaboradora,
    login
}
