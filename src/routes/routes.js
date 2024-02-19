const router = require("express").Router();

const TaskController = require("../controllers/TaskController");
const LoginController = require("../controllers/loginController");
const UserController = require("../controllers/usuarioController");

router.post("/login", LoginController.login);
router.post("/cadastrar", UserController.cadastro);
router.get("/usuario/:cpf", UserController.listarUmUsuario);
router.put("/atualizar/usuario/:cpf", UserController.atualizarUsuario);

router.post("/novaTarefa", TaskController.novaTarefa);
router.get("/tarefas", TaskController.listarTarefas);
router.get("/tarefa/:id", TaskController.listarUmaTarefa);
router.put("/atualizar/tarefa/:id", TaskController.atualizarTarefa);
router.delete("/delete/tarefa/:id", TaskController.removerTarefa);

// TODO: Adicionar segurança a esta rota.
router.delete("/delete/usuario/:cpf", UserController.removerUsuario);

// TODO: Alterar pela função de baixo
router.get("/usuarios", UserController.listarUsuarios);

// Exemplo de rota protegida.
//   router.get("/usuarios", checkPermision("admin"), async (req, res) => {
//   try {
//     // Esta rota só pode ser acessada por usuários com a role "admin"
//     await LoginController.listarUsuarios(req, res);

//     res.json({ message: "Você tem permissão para acessar esta rota." });
//   } catch (error) {
//     console.log("Erro ao listar usuários: ", error);
//     res.status(500).json({ message: "Erro ao listar usuários." });
//   }
// });

// Exemplo de rota para atribuir permissões a um asuário.
router.post("/usuarios/:id/permissions", UserController.atualizarRoleUsuarios);

module.exports = router;
