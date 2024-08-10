const { body } = require("express-validator");

const validation = () => {
  return [
    body("content")
      .isString().withMessage("O valor inserido no conteúdo da tarefa é inválido.")
      .trim().notEmpty().withMessage("O conteúdo da tarefa é obrigatório.")
      .isLength({ max: 255 }).withMessage("O conteúdo da tarefa não pode ser maior que 255 caracteres."),
  ];
}

module.exports = validation;
