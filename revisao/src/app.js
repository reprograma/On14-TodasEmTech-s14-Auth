// requerindo o express
const express = require("express")
//requerindo o cors 
const cors = require("cors")

// depois que criar a data base chamar  ela no app
const database = require("./database/config")

const dotenv = require("dotenv")


//requerindo routes
const users = require('./routes/user')
const { getAll } = require("./controllers/user")

// utilizando 
const app = express()

//usa o cors 
app.use(cors())
app.use(express.json())
// armazenamento de  variavel 
dotenv.config()

/*rotas*/
app.use('/api/users', getAll)

//exportando  o app
database.connect()

module.exports = app