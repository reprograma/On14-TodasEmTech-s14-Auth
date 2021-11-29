const mongoose = require("mongoose");

const tarefaSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  descricao: {
    type: String
  },
  dataInclusao: {
    type: String
  },
  nomeColaboradora: {
    type: String
  }
, versionKey: false})

const tarefas = mongoose.model("tarefa", tarefaSchema);

module.exports = tarefas;