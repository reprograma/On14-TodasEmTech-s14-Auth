const bcrypt = require('bcrypt')

exports.hashPassword = async(password, res) =>{
   try{ const salt = await bcrypt.genSalt(10) //tamanho da senha
    const hash = await bcrypt.hash(password, salt) //salt é o tamanho 

    return hash
   }catch(error){
       console.log(error)
       res.status(500).json({
           messagem: message.error
       })

   }
   }  
   
   