const { executeQuery } = require("../database/connector");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class LoginController {
  async select(req, res) {
    try {
      const { email = "", pass = "" } = req.body;

      const query = "SELECT * FROM user WHERE email = ?";
      const params = [email];

      const user = await executeQuery(query, params);

      if (!user[0]) {
        return res.status(401).json({ errors: ["Usuário ou senha incorreto."] });
      }

      const { id_user, pass: password } = user[0];

      if (await !bcrypt.compareSync(pass, password)) {
        return res.status(401).json({ errors: ["Usuário ou senha incorreto."] });
      }

      const token = jwt.sign({ id_user, email }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });

      res.json({ token, email });
    } catch (err) {
      return res.status(500).json({ errors: ["Algo deu errado, tente novamente mais tarde."] });
    }
  }
}

module.exports = new LoginController();
