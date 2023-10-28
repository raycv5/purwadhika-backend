const router = require("express").Router();
const { userController } = require("../controllers");
const { verifyToken, checkRole } = require("../middleware/auth");

router.get("/", verifyToken, checkRole, userController.getAll);
router.post("/", userController.register);
router.post("/login", userController.login);
router.get("/keep-login", verifyToken, userController.keepLogin);
router.patch("/", verifyToken, userController.updateUser);
router.patch("/change-password", verifyToken, userController.updatePassword);

module.exports = router;
