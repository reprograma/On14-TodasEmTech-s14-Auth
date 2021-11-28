const mongoose = require('mongoose');//instanciar > chamar algum objeto que já existe para algum contexto

const userSchema = new mongoose.Schema({
    name: {
        type:  String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;