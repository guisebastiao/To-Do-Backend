const { executeQuery } = require("../database/connector");
const jwt = require("jsonwebtoken");

const loginRequired = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ errors: ["Faça o seu login novamente."] });
  }

  const [_, token] = authorization.split(" ");

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id_user, email } = dados;

    const query = "SELECT * FROM user WHERE email = ? and id_user = ?";
    const params = [id_user, email];

    const user = executeQuery(query, params);

    if (!user) {
      return res.status(401).json({ errors: ["Usuário inválido."] });
    }

    req.id_user = id_user;
    req.email = email;
    return next();
  } catch (error) {
    return res.status(440).json({ errors: ["Sessão expirada, faça o login novamente."] });
  }
}

module.exports = loginRequired;
