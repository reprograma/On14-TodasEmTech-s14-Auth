//requerindo a model para ativar no controller
const User = require('../models/user')
//chamando o bcryp
const { hashPassWord } = require('../helpers/auth')
// importando o bcrypt
const bcrypt = require('bcrypt')
// dependencia jwt para  criação do token
const jwt = require('jsonwebtoken')

//rota de  lista 
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

  const { nome, email, password } = req.body // requerindo uma estrutura para cada  parametro 

  try{

    const newUser = new User({
      nome,
      email,
      password
    })
    /*Ele vai entrar na newUser receber os valores 
      2 tratar o campo do password para  criptografa 
    */
     const passwordHashed = await hashPassWord(newUser.password, res )
      /* vai pegar o valor  da função quando ele receber o valor ele vai entrar na função password e vai trasforma em  criptografia ai ele vai retornar ao newuser
      quando ele voltar ao newuser ele vai devouver  ao password ja criptografado  */
     newUser.password = passwordHashed

     const saveUser = await newUser.save()
     res.status(201).json ({
        message:"pessoa cadastrada com sucesso ",
       saveUser
     }) 

  }catch (error) {
    res.status(500).json({
      message: error.message
    })

  }
}

// criar loguim para receber o token para
const login = async (req, res) => {

  const { email, password } = req.body;
  try {
    
    // procurando o usuario dentro do banco de  dado por email
    const user = await User.findOne({ email: email })

    if (!user) {
    return res.status(422).send({ message: "Email não encontrado! " })
    }
    // vai checar se a senha estar  de acordo com a que o usuario cadastrou 
    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
    return res.status(422).send({ message: "Senha incorreta!" })
    }
    // criação de altenticação com o token  esta ferramenta 
    //ele vai gerar o token por id disponibilizado pelo mongoodb 
    const secret = process.env.SECRET
    const token = jwt.sign({ id: user._id }, secret)// nesta função ele pedi para inseri a secret para conseguir gerar a alteticação 
    res.status(200).json({
      message: "Senha Acho que foi " ,
      token
    })

  }catch(error){
    res.status(500).json({
      message: error.message
    })
  }  

 

   
}



module.exports ={
  getAll,
 
  registrer,
  login
}