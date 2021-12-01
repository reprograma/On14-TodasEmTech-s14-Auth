const mongoose = require('mongoose')

const tarefasSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true
    },
    dataInclusao: {
        type: String,
        required: true
    },
    concluido: {
        type:  Boolean,
        required: true
    },
    nomeColaboradora:{
        type: String,
        required: true
    }
}, { timestamps: true })


const tarefas = mongoose.model('tarefas', tarefasSchema)


module.exports = tarefas