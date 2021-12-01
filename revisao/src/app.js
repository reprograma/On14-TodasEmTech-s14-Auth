const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const database = require('./database/config')

const users = require('./routes/user')

const tarefas = require('./routes/tarefas')

const app = express()

app.use(cors())
app.use(express.json())

/* rotas Principal*/
app.use('/api/users', users)
app.use('/api/tarefas', tarefas)

dotenv.config()


database.connect()

module.exports = app