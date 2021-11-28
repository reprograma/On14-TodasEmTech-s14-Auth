const bcrypt = require('bcrypt') //importando a senha:
const jwt = require('jsonwebtoken') //parte da autorização

const User = require('../models/user');
const {hasPassword} = require('../helpers/auth')



//1° rota: get - buscar usuario
const getAll = async(req, res) =>
{
  try {
      const user = await User.find() 
    res.status(200).json({message: "Busca Realizada com Sucesso!", user})
} catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

//2° post / creat - criando o registro
const cadastro = async(req, res) => {
  const {nome, email, password} = req.body
  try {
    const newUser = new User ({
        nome,
        email,
        password
    })
    //tratar o campo password para se criptografado
    const passwordHashed = await hasPassword(newUser.password, res)
    newUser.password = passwordHashed


    //salvar os usuarios
    const saveUser = await newUser.save()
    res.status(201).json({message: "Pessoa Cadastrada com Sucesso!", saveUser})
  
  
  } catch (error) {
      res.status(500, {message: error.message})
  }

}

// Fazendo a parte do login com o Token:
const login = async(req, res) =>{
  const{email, password} = req.body;
  
  try {
    //primeiro procurar se o email e a senha da pessoa existe:
  const user = await User.findOne({email: email})
  // usuario tentando acessar - depois procurar se ele existe dentro da base de dados.
    if(!user){ //se ele n existe no baco, vai estar errado e n vai poder acessar.
      return res.status(422).send({message: "Email não encontrado!"}) //retornando o status de acesso negado.
    }
  
      //checar se a senha está certa:
      const checkPassword = await bcrypt.compare(password, user.password)
      //se a senha for errada, a pessoa recebe uma negativa:
      if(!checkPassword){
        return res.status(422).send({message: "Senha incorreta!"})
      }
      
      const secret = process.env.SECRET //aplicação para resguardar o cadastro.
      //criando o token para validar a senha:
      const token = jwt.sign({
        id: user._id
      }, secret)
      
      res.status(200).json({message: "Token deu bom!", token}) //parte da autorização.
  
    } catch (error) {
      res.status(500).json({message: error.message})
      
  }

}















//importar
module.exports = {
  getAll,
  cadastro,
  login
}