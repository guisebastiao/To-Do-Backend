const { Router } = require("express");
const taskController = require("../controllers/taskController");

const validation = require("../middlewares/validation");
const taskValidation = require("../middlewares/taskValidation");
const loginRequired = require("../middlewares/loginRequired");

const router = new Router();

router.get("/", loginRequired, taskController.select);
router.post("/", loginRequired, taskValidation(), validation, taskController.insert);
router.put("/", loginRequired, taskValidation(), validation, taskController.update);
router.delete("/", loginRequired, taskController.delete);

module.exports = router;
