const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
  
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


module.exports = mongoose.model('tasks', tasksSchema);