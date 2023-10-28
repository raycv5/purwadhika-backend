const db = require("../models");
const User = db.User;
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const users = await User.findOne({
        where: {
          [Op.or]: [
            {
              username: username,
            },
            {
              email: email,
            },
          ],
        },
      });

      if (users === null) {
        await User.create({
          username,
          email,
          password: hashPassword,
        });
        res.status(200).send("Register Success");
      } else res.status(400).send("Email or username already exists");
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const result = await User.findAll();
      res.status(200).send({ result });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
  getById: async (req, res) => {
    try {
      const result = await User.findOne({
        attributes: {
          exclude: ["password"],
        },
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send({ result });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
  deleteById: async (req, res) => {
    try {
      await User.destroy({
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
  updateUser: async (req, res) => {
    try {
      const { username, password, email } = req.body;
      const result = await User.update(
        {
          username,
          email,
          password,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).send(`User updated`);
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const isUserExist = await User.findOne({
        where: {
          username,
        },
      });

      if (!isUserExist) {
        return res.status(409).send({
          message: "Invalid Email",
        });
      }

      if (!isUserExist.isVerified) {
        console.log("User suspended");
        return res.status(400).send({ message: `You are suspended` });
      }

      const isValid = await bcrypt.compare(password, isUserExist.password);
      if (!isValid) {
        let failedAttemps = isUserExist.loginAttemps + 1;
        if (failedAttemps > 3) {
          await User.update(
            {
              isVerified: false,
              loginAttemps: 0,
            },
            {
              where: {
                id: isUserExist.id,
              },
            }
          );
        } else {
          await User.update(
            {
              loginAttemps: failedAttemps,
            },
            {
              where: {
                id: isUserExist.id,
              },
            }
          );
        }

        return res.status(400).send({
          message: "Incorrect Password",
        });
      }

      const payload = { id: isUserExist.id };
      const token = jwt.sign(payload, "JCWD0208", { expiresIn: "1h" });

      res.status(200).send({
        message: "Login Success",
        result: isUserExist,
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
  keepLogin: async (req, res) => {
    try {
      const result = await User.findOne({
        where: {
          id: req.user.id,
        },
      });
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
};
