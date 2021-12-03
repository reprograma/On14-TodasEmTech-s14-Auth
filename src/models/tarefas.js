const mongoose = require('mongoose');


const tarefasSchema = new mongoose.Schema({
     
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
  }
},{
    versionKey: false
});

const tarefas = mongoose.model('tarefas', tarefasSchema);

module.exports = tarefas;