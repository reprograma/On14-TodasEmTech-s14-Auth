const app = require("./src/app");

const port = process.env.PORT;

app.listen(port, () => console.log(`Servidor está rodando na porta ${port}`));


//mongodb+srv://carol:jpR58WhJL3TgZY3B@cluster0.htwiq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority