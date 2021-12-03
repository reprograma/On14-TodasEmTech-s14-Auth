const TarefasSchema = require("../models/tarefasSchema")


const getAll = async(req, res) => {
    try {
        const tarefas = await TarefasSchema.find()
        res.status(200).json({ messagem: "Lista de pessoas", tarefas })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};


const createTarefas = (req, res) => {
    let tarefas = new TarefasSchema(req.body);
    tarefas.save(function(err){
    if (err) res.status(500).send({ message: err.message })

    res.status(201).send(tarefas.toJSON());
  })
};




module.exports = {
    getAll,
    createTarefas
}