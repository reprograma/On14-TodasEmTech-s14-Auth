
const express = require("express")

const cors = require('cors')

const dotenv = require('dotenv')

const database = require('./database/mongoConfig')

const bodyParser = require("body-parser")


const app = express()
app.use(cors())
app.use(express.json())

//rotas
const index = require("./routes/index")
const colaboradoras = require("./routes/colaboradoras")
const tarefas = require('./routes/tarefas')



//app.use("/", index);

app.use("/colaboradoras", colaboradoras);

app.use("/tarefas", tarefas);


dotenv.config()


database.connect()

module.exports = app
