const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "123",
    database: "todo"
  }
});
module.exports = knex;
