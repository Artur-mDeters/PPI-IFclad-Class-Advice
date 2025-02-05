const db = require("../db/db");
const bcrypt = require('bcrypt')

const comparePassword = async (userEnteredPassword, hashedPassword) => {
    const isMatch = await bcrypt.compare(userEnteredPassword, hashedPassword)
    if (isMatch) {
        console.log("usuário válido")
        return isMatch
    } else {
        console.log("senha ou email incorretos")
        return isMatch
    }
}

exports.getUserData = async (req, __) => {
    const {email, password} = req.body
    try {
        let userData = await db.query('SELECT * FROM usuario WHERE email = $1', [email])
        await userData.map(user => {
            userData = {
                email: user.email,
                password: user.senha
            }
        })

        if ('email' in userData) {
            await comparePassword(password, userData.password)
            res.send("usuario encontrado!").status(200)
        } else {
            res.send("usuário não encontrado").status(404)
        }
        
    } catch (err) {
        throw new Error("Erro ao buscar usuário: " + err);

    }
}
