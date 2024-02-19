const database = require("../database/connection");

class TaskController {
  novaTarefa(req, res) {
    const { tarefa, descricao, responsavel } = req.body;

    console.log(tarefa, descricao, responsavel);

    database
      .insert({ tarefa, descricao, responsavel })
      .table("tasks")
      .then(data => {
        console.log(data);
        res.json({ message: "Tarefa criada com sucesso!" });
      })
      .catch(console.log);
  }

  listarTarefas(req, res) {
    database
      .select("*")
      .from("tasks")
      .then(data => {
        console.log(data);
        res.json(data);
      })
      .catch(console.log);
  }

  listarUmaTarefa(req, res) {
    const { id } = req.params;

    database
      .select("*")
      .table("tasks")
      .where({ id })
      .then(data => res.json(data))
      .catch(console.log);
  }

  atualizarTarefa(req, res) {
    const { id } = req.params;
    const { descricao } = req.body;

    database
      .where({ id })
      .update({ descricao })
      .table("tasks")
      .then(data => res.json({ message: "Tarefa atualizada com sucesso" }))
      .catch(console.log);
  }

  removerTarefa(req, res) {
    const { id } = req.params;

    database
      .where({ id })
      .del()
      .table("tasks")
      .then(data => res.json({ message: "Tarefa removida com sucesso" }))
      .catch(console.log);
  }
}

module.exports = new TaskController();
