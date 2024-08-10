const { Router } = require("express");

const validation = require("../middlewares/validation");
const userValidation = require("../middlewares/userValidation");
const LoginController = require("../controllers/loginController");

const router = new Router();

router.post("/", userValidation(), validation, LoginController.select);

module.exports = router;
