const { Router } = require("express");
const userController = require("../controllers/userController");

const validation = require("../middlewares/validation");
const userValidation = require("../middlewares/userValidation");

const router = new Router();

router.post("/", userValidation(), validation, userController.insert);

module.exports = router;
