const express = require("express");
const cors = require("cors");
const apiRoutes = require("../routes/routes");
const fileupload = require("express-fileupload");
const path = require("path");

const PORT = process.env.PORT || 3030;
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileupload());
app.use(apiRoutes);

// Servir a pasta de fotos diretamente
app.use("/fotos", express.static(path.join(__dirname, "..", "fotos")));

const EventEmitter = require('events');
EventEmitter.defaultMaxListeners = 20; 

// Rotas da API


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
