const colaboradoras = require("../models/colaboradoras");
const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const getAllTarefas = (req, res) => {
    // ...
};


const postTarefa = (req, res) => {
    // ...
};

const validacao = (req, res) => {
  // ...
}


module.exports = {
    getAllTarefas,
    postTarefa,
    validacao
}
