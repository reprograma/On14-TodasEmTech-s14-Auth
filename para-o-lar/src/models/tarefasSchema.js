const mongoose = require("mongoose");

const tarefasSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,

  _id:{
    type: Number,
    required: true
  },
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


module.exports = mongoose.model('tarefas', tarefasSchema);
