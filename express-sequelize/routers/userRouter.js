const router = require("express").Router();
const { userController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");

router.post("/", userController.register);
router.post("/login", userController.login);
router.get("/", userController.getAll);
router.get("/keep-login", verifyToken, userController.keepLogin);
router.get("/:id", userController.getById);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteById);

module.exports = router;
