/*Criado para altenticações altorizaçoes e afins assim podemos utilizar a dependencia 
BCRYPT para  criptografar as senhas 
serão funçoes alciliadoras  */
const bcrypt = require('bcrypt')

//exportando a função direta  no node 
exports.hashPassWord = async (password, res ) => {
   // definir quantidades de caracteres
  try{  
    const salt = await bcrypt.genSalt(10)
    // trasformando a senha recebida em uma hash em outras palavras cripitografando 
    const hash = await bcrypt.hash(password, salt) 
    //assim retorna 
    return hash

  } catch(error){
    console.log(error)
    res.status(500).json({
      mensage:mensage. error
    })
  }
}

 