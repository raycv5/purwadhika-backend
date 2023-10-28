const db = require("../models");
const Tweet = db.Tweet;
const User = db.User;

module.exports = {
  post: async (req, res) => {
    const { tweet, UserId } = req.body;
    try {
      await Tweet.create({
        tweet,
        UserId,
      });
      res.status(200).send(`Tweet Posted`);
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
  getAllTweet: async (req, res) => {
    try {
      const result = await Tweet.findAll({
        order: [["id", "DESC"]],
        include: [
          {
            model: User,
            attributes: ["username", "email"],
          },
        ],
      });
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
  getTweetById: async (req, res) => {
    try {
      const result = await Tweet.findAndCountAll({
        include: [
          {
            model: User,
            attributes: ["username", "email"],
            where: {
              id: req.params.id,
            },
          },
        ],
      });
      res.status(200).send({ data: result });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
  deleteTweet: async (req, res) => {
    try {
      await Tweet.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send(`User deleted`);
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
};
