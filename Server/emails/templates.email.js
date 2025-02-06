// emails/templates.js

const welcomeEmail = (name) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f9f9f9; padding: 20px;">
    <h2 style="color: #004080;">Bem-vindo, ${name}!</h2>
    <p>Obrigado por se cadastrar. Estamos felizes em ter você conosco!</p>
    <a href="https://www.seusite.com" style="background-color: #007BFF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Visite nosso site</a>
  </div>
`;

const passwordResetEmail = (resetLink) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #fff; padding: 20px;">
    <h2 style="color: #D9534F;">Redefinição de Senha</h2>
    <p>Você solicitou a redefinição de senha. Clique no botão abaixo para prosseguir:</p>
    <a href="${resetLink}" style="background-color: #D9534F; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Redefinir Senha</a>
  </div>
`;

const notificationEmail = (message) => `
  <div style="font-family: Arial, sans-serif; background-color: #e9ecef; padding: 15px; border-radius: 8px; text-align: center;">
    <h3>📢 Notificação Importante</h3>
    <p>${message}</p>
  </div>
`;

module.exports = {
  welcomeEmail,
  passwordResetEmail,
  notificationEmail
};
