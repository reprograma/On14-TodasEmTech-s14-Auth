const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const database = require('./database/config')

const users = require('./router/user')

const app = express()

app.use(cors())

app.use(express.json())

//Rotas
app.use("./api/users", users)

dotenv.config()

app.get('/', (req, res) => {
    res.status(200).json({
        mensagem: "Opá!! Deus certo heheheeh."
    })
})

database.connect()

module.exports = app
