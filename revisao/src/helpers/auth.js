//helpers criados para diversos contextos usados de hash
const bcrypt = require("bcrypt")

exports.hashPassword = async (password, res) => {
    
    try{const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    return hashPassword

    
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
}

/*
Ou
const hasPassword



password: 1234 --> password: huasdA&S¨D (10 Caracteres)
*/