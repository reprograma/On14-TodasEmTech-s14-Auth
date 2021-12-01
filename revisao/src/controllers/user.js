const User = require('../models/User');
const {hashPassword} = require('../helpers/auth') 
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')


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

const register = async(req, res) => {
    const { name, email, password } = req.body
    try {
        const newUser = new User({
            name,
            email,
            password
        })
//Trato campo password para ser criptografado
const passwordHashed = await hashPassword(newUser.password, res )
newUser.password = passwordHashed

const saveUser = await newUser.save()
res.status(201).json({
    messagem: "Pessoa cadastrada com sucesso!",
    saveUser
})


    } catch (error) {
        res.status(500).json({
            message:error.message
        })

    }

}

//Fazer Login
const login = async(req, res)=>{
    const{email,password} = req.body;
   try{ 
       const user = await User.findOne({email: email})
    if(!user){
        return res.status(422).send({message: "Email não encontrado!"})
    }
    const chekPassword = await bcrypt.compare(password, user.password)
    if(!chekPassword){
       return res.status(422).send({message: "Senha incorreta!"})
    }

    //Criar Token
    const secret = process.env.SECRET 
    const token = jwt.sign({
        id: user._id

    }, secret)
    res.status(200).json({
        message: "Toke deu bom!",
        token
    })
}catch(error) {
    res.status(500).json({
        message: erro.message
    })
    console.log(error)
}
 }
module.exports = {
    getAll,
    register,
    login
}
