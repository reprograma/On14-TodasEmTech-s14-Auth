require("dotenv-safe").config()
const express = require("express")
const mongoose = require("mongoose")


const app = express()

//String de conexão
mongoose.connect(process.env.MONGODB_URI,  {
     useNewUrlParser: true,
     useUnifiedTopology: true
});

//Conexão com o mongo
let db = mongoose.connection;

// Captura de erro ou sucesso na conexão
db.on("error", console.log.bind(console, "connection error:"))
db.once("open", function (){
  console.log("conexão feita com sucesso.")
})


//rotas
const index = require("./routes/index")
const colaboradoras = require("./routes/colaboradoras")
const tarefas = require("./routes/tarefasRoutes")


//configurar body parser

app.use(express.json());


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*") 
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
        )
        next()
   
    })

app.use("/", index)
app.use("/colaboradoras", colaboradoras)
app.use("/tarefa", tarefas)

module.exports = app