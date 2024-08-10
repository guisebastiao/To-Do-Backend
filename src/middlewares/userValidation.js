const { body } = require("express-validator");

const validation = () => {
  return [
    body("email")
      .isString().withMessage("O valor inserido na e-mail é inválido.")
      .trim().notEmpty().withMessage("O e-mail é obrigatório.")
      .isLength({ max: 255 }).withMessage("O e-mail não pode ser maior que 255 caracteres."),
    body("pass")
      .isString().withMessage("O valor inserido na senha é inválido.")
      .trim().notEmpty().withMessage("A senha é obrigatória.")
      .isLength({ min: 5 }).withMessage("A senha precisa conter no mínimo 5 caracteres.")
      .isLength({ max: 60 }).withMessage("A senha não pode ser maior que 60 caracteres."),
  ];
}

module.exports = validation;
