const { executeQuery } = require("../database/connector");
const bcrypt = require("bcryptjs");

class UserController {
  async insert(req, res) {
    try {
      const { email, pass } = req.body;

      const query = "INSERT INTO user (email, pass) VALUES (?, ?)";
      const params = [email, bcrypt.hashSync(pass, 10)];

      await executeQuery(query, params);

      return res.json({ success: ["Usuario criado com sucesso."] });
    } catch (err) {
      if (err.errno === 1062) {
        return res.status(409).json({ errors: ["Esse usuário já existe."] })
      }

      return res.status(500).json({ errors: ["Algo deu errado, tente novamente mais tarde."] });
    }
  }
}

module.exports = new UserController();
