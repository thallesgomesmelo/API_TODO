const database = require("../database/connection");

class User {
  static async findByCPF(cpf) {
    return database("usuarios").where({ cpf }).first();
  }

  static async findAll() {
    return database("usuarios");
  }

  static async create({ cpf, nome, email, senha }) {
    return database("usuarios").insert({ cpf, nome, email, senha });
  }

  static async update(cpf, { nome, email }) {
    return database("usuarios").where({ cpf }).update({ nome, email });
  }

  static async delete(cpf) {
    return database("usuarios").where({ cpf }).del();
  }
}

module.exports = User;
