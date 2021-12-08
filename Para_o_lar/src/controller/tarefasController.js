const tarefas = require("../models/tarefas")
const bcrypt = require('bcrypt');

const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken');
const {hashPassword} =require('../helpers/auth')


const getAll = async(req, res) => {

  try{
    const tarefa = await tarefas.find()
    
    res.status(200).json({messagem:"lista de tarefas", tarefa})
   
}   catch (error){
    res.status(500).json({
        message: error.message
    })
}
};

const postTarefa = async(req,res) =>{
 const {id ,descricao,dataInclusao,concluido,nomeColaboradora,password} = req.body
  try {
      const newUser = new tarefas(
          {
            id ,
            descricao,
            dataInclusao,
            concluido,
           nomeColaboradora,
           password
         }   )

         const passwordHashed = await hashPassword(newUser.password,res)
          
         newUser.password = passwordHashed

          const saveUser = await newUser.save()

         res.status(201).json({
             messagem:"tarefa cadastrada com sucesso",
           saveUser
          })
         
        }  catch (error){
            res.status(500).json({
               message: error.message
           })
     } 
   };







module.exports = {
    getAll,
   postTarefa

}
