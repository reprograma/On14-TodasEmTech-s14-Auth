/*
id : { type : Number},
    descricao: { type: String },
    dataInclusao: { type: String },
    concluido: { type: Boolean },
    nomeColaboradora: { type: String } 
*/

const mongoose = require('mongoose');

const tarefaSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    descricao: {
        type:  String,
        required: true
    },
    concluido: {
        type: Boolean,
        required: true
    },
    nomeColaboradora: {
        type: String,
        required: true
    }
    
}, { timestamps: true });

const Tarefa = mongoose.model('Tarefa', tarefaSchema);

module.exports = Tarefa;