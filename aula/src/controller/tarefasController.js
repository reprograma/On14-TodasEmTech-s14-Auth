const TarefaSchema = require("../models/tarefasSchema")


const getAll = async (req, res) => {
    try {
        const tarefas = await TarefaSchema.find()
        res.status(200).json({ messagem: "Lista de pessoas", tarefas })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};


const create = (req, res) => {
    

    let tarefa = new TarefaSchema(req.body);
    tarefa.save(function(err){
    if (err) res.status(500).send({ message: err.message })

    res.status(201).send(tarefa.toJSON());
  })
};




module.exports = {
    getAll,
    create
}