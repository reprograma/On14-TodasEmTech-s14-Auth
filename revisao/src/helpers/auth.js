const bcrypt = require('bcrypt')

exports.hashPassword = async(password, res) =>{
try{

    const salt =await bcrypt.genSalt(10)
    //const toHashPassword = await bycrpt.hash() poderia fazer assim

    const hash = await bcrypt.hash(password, salt)
    return hash

}catch(error){
    console.log(error)
    res.status(500).json({
        message:message.error

    })
}
    
}

//password: 1234 >>  b3n29-
