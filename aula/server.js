const app = require("./src/app")
const port = 7000;

app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`);
});