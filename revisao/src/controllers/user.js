//requerindo a model para ativar no controller
const { modelNames } = require('mongoose')
const User = require('../models/User')

//rota de  retorno  
const getAll = async(req, res) =>{
  try{
    const users = await User.find()
    res.status(200).json({mensage:"Lista de pessas",users})

  } catch (error) {
    res.status(500).json({
      mensage: error.message
    })
  }

}

// criando registro de pessoas função async
const registrer = async(req, res) => {

  const { nome, email, password} = req.body // requerindo uma estrutura para cada  parametro 

  try{

    const newUser = new User({
      nome,
      email,
      password
    })

    const saveUser = await newUser.save()
    res.status(201).json ({ message:"pessoa cadastrada com sucesso ",
    saveUser}) 
    

  }catch (error) {
    res.status(500).json({
      message: error.message
    })

  }
}


module.exports ={
  getAll,
  registrer
}