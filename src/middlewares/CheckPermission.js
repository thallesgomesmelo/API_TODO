function checkPermission(req_Permission) {
  return async (req, res, next) => {
    try {
      // Verificar se usuário está autenticado.
      if (!req.user) {
        return res.status(401).json({ error: "Usuário não autenticado." });
      }

      // Verifica se o usuário possui a permissão necessário.
      if (req.user.permissions.includes(req_Permission)) {
        // Se possuir permissão, permite o acesso a rota.
        next();
      } else {
        // Se não possuir permissão, nega acesso a rota.
        res.status(403).json({ error: "Acesso negado." });
      }
    } catch (error) {
      console.log("Erro ao verificar permissão: ", error);
      res.status(500).json({ message: "Erro ao verificar permissão." });
    }
  };
}

module.exports = checkPermission;
