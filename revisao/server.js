
// requerindo o app
const app = require('./src/app');
// ativando a  prta  da variavel  de ambiaante 
const PORT = process.env.PORT 

//usoar o app 
app.listen(PORT,() => console.log(`Servidor esta rodando na porta ${PORT}`))

