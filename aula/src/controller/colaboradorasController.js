const colaboradoras = require("../models/colaboradoras")



const getAll = (req, res) => {
  console.log(req.url);
    colaboradoras.find(function (err, colaboradoras){
      res.status(200).send(colaboradoras)
    })     
};

const postColaboradora = (req, res) => {
  console.log(req.body);

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
