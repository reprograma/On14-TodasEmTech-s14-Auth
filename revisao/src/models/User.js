//requerir o mongoose 
const mongoose = require('mongoose')

// ativar a uri do .env = mongoose.Schema define foma de documento dentro desta coleção 
// Orientação obj  pesquisar 
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
},{timestamps: true}) // vai mostrar quando foi criado 

// detalhar  o banco  de dados 
const User = mongoose.model('User', userSchema)// armazenando o obj criado para model 

module.exports = User 