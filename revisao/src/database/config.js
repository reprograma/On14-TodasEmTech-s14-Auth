//tipo de convensão  depende do projeto que  vc esta 
// requerir o monguse para ativar o banco de dados  assim conctando para escever o javascript

const mongoose= require('mongoose')
// assim chamando o mongoose em uma função async lembrando que  sempre espera uma resposta 
const connect = async() =>{// promeci para ser realizada 
 
  try{ // passar no parametro  o que ele pede 
    await mongoose.connect(process.env.MONGO_URI, {// utilizando o metodo  para  conctar ao B/
      useNewUrlParser: true,//assim ele consegue pegar os parametros 
      useUnifiedTopology: true // tipologia verificando a base de obj para ver o que o monguse pode receber sempre verifique a documentação 

    })
    console.log("Banco de dados conectado")
  } catch(error){// caso der error chamado de tratamento de erro 
    console.log(error)
  }
}


module.exports ={
  connect
}