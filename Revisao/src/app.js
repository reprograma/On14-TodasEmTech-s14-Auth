const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const database = require('./database/config')

const users = require('./routes/user')

const app = express()

app.use(cors())
app.use(express.json())

//rotas
app.use('/api/users', users)

dotenv.config()

// app.get('', (req,res)=>{
//     res.status(200).json({
//         mensagem:"Deu bom"
//     })
// })

database.connect()

module.exports = app