const mongoose = require('mongoose'); //forma de conectar o mongo com o js. conseguimos escrever as collections com js

const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Banco de dados conectado.`);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    connect
}; //modulo > criar funcionalidades que podem ser exportadas pelo module exports(?)