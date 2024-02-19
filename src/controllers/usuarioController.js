const bcrypt = require("bcrypt");

const database = require("../database/connection");
const User = require("../models/User");

const SALT_ROUNDS = 10;

class UserController {
  async cadastro(req, res) {
    try {
      const { senha, email, nome, cpf } = req.body;

      // Validação dos dados de entrada.
      if (!senha || !email || !nome || !cpf) {
        return res
          .status(400)
          .json({ message: "Por favor, preencha todos os campos!" });
      }

      // Verificar se CPF já esta em uso.
      const existingCPF = await User.findByCPF(cpf);

      if (existingCPF) {
        return res.status(400).json({ message: "Já existe um usuário cadastrado!" });
      }

      // Hash da senha antes de armazenar no banco de dados.
      const hashedPassword = await bcrypt.hash(senha, SALT_ROUNDS);

      // Salvar os dados no banco de dados.
      User.create({ cpf, nome, email, senha: hashedPassword });
      res.status(200).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao cadastrar usuário!" });
    }
  }

  async listarUsuarios(req, res) {
    try {
      const users = await database("usuarios");

      if (!users) {
        return res.status(404).json({ message: "Nenhum usuário cadastrado!" });
      }

      return res.json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao listar usuarios!" });
    }
  }

  async listarUmUsuario(req, res) {
    try {
      const { cpf } = req.params;
      const user = await database("usuarios").where({ cpf }).first();

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao listar usuário!" });
    }
  }

  async atualizarUsuario(req, res) {
    try {
      const { cpf } = req.params;
      const { email, nome } = req.body;

      const existingUser = await database("usuarios").where({ cpf }).first();

      if (!existingUser) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      // Atualizar dados do usuário.
      await database("usuarios").where({ cpf }).update({ email, nome });

      return res.json({ message: "Dados do usuário atualizado com sucesso." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao atualizar usuário!" });
    }
  }

  async atualizarRoleUsuarios(req, res) {
    const { cpf } = req.params;
    const { role } = req.body;

    try {
      const user = await User.findByCPF(userCPF);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      // Atribuir as permissões ao usuário.
      await database("usuarios").where({ cpf }).update({ role });

      return res.json({ message: "Permissões atribuidas com sucesso." });
    } catch (error) {
      console.log("Erro ao atribuir permissões ao usuário: ", error);
      return res
        .status(500)
        .json({ message: "Erro ao atribuir permissões ao usuário." });
    }
  }

  async removerUsuario(req, res) {
    try {
      const { cpf } = req.params;

      const existingUser = await database("usuarios").where({ cpf }).first();

      if (!existingUser) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      // Removendo usuário.
      await database("usuarios").where({ cpf }).del();

      return res.json({ message: "Usuário removido com sucesso." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao remover usuário!" });
    }
  }
}

module.exports = new UserController();
