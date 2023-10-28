const router = require("express").Router();
const { studentControllers } = require("../controllers");

router.get("/", studentControllers.getAll);
router.get("/:id", studentControllers.getById);
router.delete("/:id", studentControllers.deleteById);
router.post("/add", studentControllers.addUser);
router.patch("/:id", studentControllers.updateUser);

module.exports = router;
