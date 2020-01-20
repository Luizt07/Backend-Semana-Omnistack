const express = require("express"); // Instanciando o express para o uso
const mongoose = require("mongoose")
const cors = require('cors')
const routes = require('./routes')
const http = require('http')
const {setupWebsocket} = require('./websocket')

const app = express(); // utilizando a função do express
const server = http.Server(app);

setupWebsocket(server)

mongoose.connect('mongodb+srv://luiz:luiz@cluster0-d80za.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser : true,
    useUnifiedTopology : true,
})

app.use(cors());
app.use(express.json())

app.use(routes)

server.listen(3333); // list de qual a porta do local host minha aplicação ta rodando