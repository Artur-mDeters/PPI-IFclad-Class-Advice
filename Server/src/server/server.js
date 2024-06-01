const express = require("express");
const cors = require("cors");
const { default: routes } = require("../routes/routes");

const app = express();
const PORT = 3030;

app.use(cors()); 
app.use(express.json()); 

app.use(routes)

app.listen(PORT, () => {
  console.warn(`App rodando em http://localhost:${PORT}`);
});
