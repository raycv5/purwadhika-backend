const router = require("express").Router();
const { tweetController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");

router.get("/", tweetController.getAllTweet);
router.get("/:id", tweetController.getTweetById);
router.delete("/:id", tweetController.deleteTweet);
router.post("/", verifyToken, tweetController.post);

module.exports = router;
