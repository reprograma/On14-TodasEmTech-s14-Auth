const TarefaSchema = require("../models/tarefas")


const getAll = async (req, res) => {
    try {
        const acharTarefa = await TarefaSchema.find()
        res.status(200).json({ messagem: "Lista de pessoas", acharTarefa })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};


const create = (req, res) => {
   
    let criarTarefa = new TarefaSchema(req.body);
    criarTarefa.save(function(err){
    if (err) res.status(500).send({ message: err.message })

    res.status(201).send(criarTarefa.toJSON());
  })
};




module.exports = {
    getAll,
    create
}