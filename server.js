const app = require("./src/app")
const port = 3090;

app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`);
});