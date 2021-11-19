const mongoose = require("mongoose");

const tarefaSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,

  descricao: {
    type: String,
    required: true,
  },
  dataInclusao: {
    type: Date,
   default: new Date(),
  },
  concluido: {
    type: Boolean,
    required: true,
  },
  nomeColaboradora: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model('tarefa', tarefaSchema);


