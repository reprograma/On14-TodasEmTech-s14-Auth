const express = require("express");
const cors = require("cors");
//const dotenv = require("dotenv");
const dotenv = require("dotenv-safe")
//require('dotenv-safe').config();
const db = require("./database/config")
const users = require("../src/routes/user")
const app = express();


app.use(cors());
app.use(express.json());

/* rotas */
app.use("/api/users", users)


dotenv.config()

db.connect();

app.get("/", (req, res) => {
  res.status(200).json({
    mensagem: "Deu bom.",
  });
});


//
module.exports = app;