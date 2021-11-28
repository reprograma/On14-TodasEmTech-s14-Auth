const mongoose = require('mongoose')

//criando a minha colletion
const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
password: {
  type: String,
  required: true
}

}, {timestamps: true})

//exportar meu squima
const user = mongoose.model('user', userSchema)
//exportar o models
module.exports = user