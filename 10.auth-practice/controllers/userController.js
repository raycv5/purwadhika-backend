const db = require("../models");
const User = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  getAll: async (req, res) => {
    try {
      const result = await User.findAndCountAll();
      res.status(200).send({ result });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const isEmailExist = await User.findOne({
        where: {
          email,
        },
      });

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      if (isEmailExist) {
        res.status(409).send({ message: "Email already registered" });
      }

      await User.create({
        username,
        email,
        password: hashPassword,
      });
      res.status(200).send("User Created");
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const isUserExist = await User.findOne({
        where: {
          email,
        },
      });

      if (!isUserExist) {
        return res.status(409).send({
          message: "Invalid email",
        });
      }

      console.log(req.body);

      const isValid = await bcrypt.compare(password, isUserExist.password);
      if (!isValid) {
        return res.status(400).send({
          message: "Incorrect Password",
        });
      }

      const payload = { id: isUserExist.id, isAdmin: isUserExist.isAdmin };
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
  updateUser: async (req, res) => {
    try {
      const { username, email } = req.body;
      const result = await User.update(
        {
          username,
          email,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      res.status(200).send(`User updated`);
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      await User.update(
        {
          password: hashPassword,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      res.status(200).send("Password Changed");
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
