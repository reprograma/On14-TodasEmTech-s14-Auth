const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User');
const { hashPassword } = require('../helpers/auth')

//sem rota privada
const getAll = async(req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({ messagem: "Lista de pessoas", users })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//com rota privada
const getUsers = async(req, res) => {
    //passar o id por parametro
    const id = req.params.id

    //buscar pelo id e trazer todas as infos. menos a senha
    const user = await User.findById(id, '-password')

    if (!user) {
        return res.status(422).send({ message: "Não encontramos nenhum cadastro com a informação passada." })
    }

    res.status(200).json({
        user
    })
}
const register = async(req, res) => {
    const { name, email, password } = req.body

    try {
        const newUser = new User({
            name,
            email,
            password
        })

        //tratar o campo password para ser criptografado
        const passwordHashed = await hashPassword(newUser.password, res)

        newUser.password = passwordHashed

        const saveUser = await newUser.save()
        res.status(201).json({
            messagem: "Pessoa cadastrada com sucesso",
            saveUser
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(422).send({ message: "Email não encontrado!" })
        }
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return res.status(422).send({ message: "Senha incorreta!" })
        }

        const secret = process.env.SECRET
        const token = jwt.sign({ id: user._id }, secret)

        res.status(200).json({
            message: "Token deu bom!",
            token
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {
    getAll,
    getUsers,
    register,
    login
}