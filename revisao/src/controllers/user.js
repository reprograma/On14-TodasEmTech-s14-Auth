const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/User")
const { hashPassword } = require("../helpers/auth")




const getAll = async (req, res) => {
    try {
        const All = await User.find()
        res.status(200).json({ messagem: "Lista de todos os Usuários:", All })
    } catch (error) {
        res.status(500).json({
            message: console.error.message
        })
    }

}

const register = async (req, res) => {

    const { name, email, password } = req.body

    try {
        const newUser = new User({
            name,
            email,
            password
        })

        //Tratar o campo password  para ser criptogradado
        const passwordHashed = await hashPassword(newUser.password, res)

        newUser.password = passwordHashed

        const saveUser = await newUser.save()
        res.status(201).json({ message: "Cadastro feito com sucesso", saveUser })

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
        const token = jwt.sign({
            id: user._id
        }, secret)
        res.status(200).json({
            message: "Token deu bom",
            token
        })

    } catch (error) {
        res.status(500).json({
            message: erro.message
        })
    }
}

module.exports = {
    getAll, register, login
}