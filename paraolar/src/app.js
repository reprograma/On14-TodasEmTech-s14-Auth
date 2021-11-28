const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

//depois de ajustar a conc no database, agora vou conectar o banco de dados no app. chamar.
const database = require('./database/data')

const getUser = require('./router/routerUser')

const app = express();

app.use(cors())
app.use(express.json())

/*rotas*/
app.use('/api/user', getUser)

dotenv.config()


database.connect() //depois e importar o caminho la em cima.
module.exports = app