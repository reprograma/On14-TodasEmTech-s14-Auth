const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = require('../models/UserSchema');
const { hashPassword } = require('../helpers/auth');

const getUsers = async(req, res) => {
    try {
        const users = await UserSchema.find();
        res.status(200).json({ message: "Lista de pessoas", users});      
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const register = async(req, res) => {
    const { name, email, password } = req.body

    try {
        const newUser = new UserSchema({
        name,
        email,
        password
        })
        
        //trato o campo password para ser criptografado
        const passwordHashed = await hashPassword(newUser.password, res);
        
        newUser.password = passwordHashed;
        
        const saveUser = await newUser.save();
        res.status(201).json({
            message: `Pessoa cadastrada com sucessso`, saveUser
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

};

const login = async(req, res) => {
    const {email, password} = req.body;

    try{
        const user = await UserSchema.findOne({email:email});

        if(!user){
            return res.status(422).send({ message: `Email não encontrado.`});
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword){
            return res.status(422).send({ message: `Senha incorreta.`});
        }

        const secret = process.env.SECRET
        const token = jwt.sign({
            id: user._id
        }, secret);

        res.status(200).json({
            message: `Token deu bom!`, token
        });

    } catch(error) {
        res.status(500).json({message: error.message
        })
    }
}

module.exports = {
    getUsers,
    register,
    login
};