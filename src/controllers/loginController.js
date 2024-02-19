const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const database = require("../database/connection");

const SECRET = "M3str1@";

class LoginController {
  async login(req, res) {
    const { email, senha } = req.body;

    try {
      const user = await verificarCredenciais(email, senha);

      if (!user) {
        return res.status(401).json({ message: "Usuário ou senha inválidos." });
      }

      // Gerar token JWT
      const expiresIn = 60 * 24 * 24 * 7; // Tempo de expiração do token (em segundos)
      const token = jwt.sign({ email }, SECRET, { expiresIn });

      return res.json({ auth: true, token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao logar usuário!" });
    }
  }

  logout(req, res) {
    res.json({
      auth: false,
      token: null,
      message: "Usuário deslogado com sucesso."
    });
  }
}

async function verificarCredenciais(email, senha) {
  // Consultar o banco de dados para encontrar o usuário com o email fornecido.
  const user = await database("usuarios").where({ email }).first();

  // Verificar se o usuário existe e se a senha corresponde.
  if (user && (await bcrypt.compare(senha, user.senha))) {
    return user;
  }

  // Se não houver corresponde ou senha estiver incorreta.
  return null;
}

module.exports = new LoginController();
