const express = require("express");
const cors = require("cors");
const apiRoutes = require('../routes/routes')
const PORT = process.env.PORT || 3030;

const app = express();

app.use(cors()); 
app.use(express.json()); 


app.use(apiRoutes)

app.listen(PORT, () => {
  console.log(`App rodando em http://localhost:${PORT}`);
});
