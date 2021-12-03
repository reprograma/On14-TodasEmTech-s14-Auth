const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: { type: String },
    require: { type: String }
    
},{
    email: {
        type: String,
        unique: true,
        required: true, 
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true})  // finalizade para nao criar um campo novo, é fornecido pelo mongoose, mostra ultima atualização do cadastro

const user = mongoose.model('user', userSchema)

module.exports = user