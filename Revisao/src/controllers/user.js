const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const { hashPassword } = require('../helpers/auth')

const getAll = async(req, res) =>{
    try {
        const users = await User.find()
        res.status(200).json({messagem: "Lista de pessoas", users})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
const register = async(req,res)=>{
    const {name, email, password} = req.body
    try {
        const newUser = new User({
            name,
            email,
            password
        })

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

const login = async(req,res)=>{
    const {email, password} = req.body

    try {
        const user = await User.findOne({email:email})

        if(!user){
            return res.status(422).send({message:"Não encontramos seu email"})
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            return res.status(422).send({message: "Senha incorreta!"})
        }
        const secret = process.env.SECRET
        const token = jwt.sign({id: user._id}, secret)

        res.status(200).json({
            message: "Token deu bom!",
            token
        })

    } catch (error) {
        res.status(500).json({
            message: erro.message
        })
    }
}

module.exports = {
    getAll,
    register,
    login
}