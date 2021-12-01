require('dontenv-safe').config();
const express = require("express")
const mongoose = require("mongoose")


const app = express()


mongoose.connect(process.env.MONGODB_URI,  {
     useNewUrlParser: true,
     useUnifiedTopology: true
});


let db = mongoose.connection;


db.on("error", console.log.bind(console, "connection error:"))
db.once("open", function (){
  console.log("conexão feita com sucesso.")
})



const index = require("./routes/index")
const colaboradoras = require("./routes/colaboradoras")
const tasks = require("./routes/tasks")


app.use(express.json())



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
app.use("/tarefas", tarefasRoutes)

module.exports = app