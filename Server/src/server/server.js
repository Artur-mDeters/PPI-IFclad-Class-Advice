const express = require("express");
const cors = require("cors");
const apiRoutes = require('../routes/routes')
const fileupload = require("express-fileupload")

const PORT = process.env.PORT || 3030;

const app = express();

app.use(cors()); 
app.use(express.json());
app.use(fileupload())

app.use(apiRoutes)

app.listen(PORT, () => {
  try {
    console.log(`App rodando em http://localhost:${PORT}`);
  } catch (error) {
    console.error(error);
  }
});
