const express = require('express')
const cors = require('cors')

const dotenv = require('dotenv')

const database = require('./database/config')

const users = require('./routes/user')

const app = express()

app.use(cors())
app.use(express.json())

//rota principal
app.use('/api/users', users)

dotenv.config()


database.connect()

module.exports = app
