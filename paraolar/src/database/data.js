const mongoose = require('mongoose')
//Abaixo - método para concetar ao banco de dados
const connect = async() =>{
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useNewUrlParser: true
    })
  console.log("Banco de Dados Conectado! top!")
       
} catch (error) {
    consolo.log(error)
  }
}

module.exports = {
  connect
}