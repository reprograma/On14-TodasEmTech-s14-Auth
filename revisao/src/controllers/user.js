const User = require('../models/User');

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



    } catch (error) {

    }

}


module.exports = {
    getAll
}