// routes/routes.js
const express = require("express");
const router = express.Router();
const { login, profile } = require("../controller/auth.controller");

// Rota de login
router.post("/login", login);

// Rota de perfil (requere token JWT)
router.get("/profile", profile);

module.exports = router;
