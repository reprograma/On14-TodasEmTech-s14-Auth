const bcrypt = require('bcrypt')

exports.hasPassword = async(password, res) => {
  try {
    //definir quantidade de caracteris para hash e atribuições.
  const salt = await bcrypt.genSalt(10) //tamanho da senha
  const hash = await bcrypt.hash(password, salt) //resposanvel pela criptografia
  //agora o retorno:
  return hash
  
} catch (error) {
    console.log(error)
    res.status(500).json({message: message.error})
  }
}
















//configurar a senha para criptohrafar
//serão funções auxiliadoras