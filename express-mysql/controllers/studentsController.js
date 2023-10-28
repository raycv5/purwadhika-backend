const db = require("../database");

module.exports = {
  getAll: (req, res) => {
    db.query("SELECT * FROM Students", (err, result) => {
      if (err) res.status(400).send({ message: err.message });
      else
        res.status(200).send({
          status: "Success",
          data: result,
        });
    });
  },
  getById: (req, res) => {
    db.query(
      `SELECT * FROM Students WHERE id = ${parseInt(req.params.id)}`,
      (err, result) => {
        if (err) {
          res.status(400).send({ message: err.message });
        } else {
          res.status(200).send({
            status: "Success",
            data: result,
          });
        }
      }
    );
  },
  addUser: (req, res) => {
    const { name, age, address, gender } = req.body;
    db.query(
      `INSERT INTO Students (name, age, address, gender ) VALUES ('${name}', ${parseInt(
        age
      )}, '${address}', '${gender}')`,
      (err, result) => {
        if (err) {
          res.status(400).send({ message: err.message });
        } else {
          res.status(200).send({
            status: "Success",
            data: result,
          });
        }
      }
    );
  },
  deleteById: (req, res) => {
    db.query(
      `DELETE FROM Students WHERE id = ${req.params.id}`,
      (err, result) => {
        if (err) {
          res.status(400).send({ message: err.message });
        } else {
          res.status(200).send({
            status: "Success",
            data: result,
          });
        }
      }
    );
  },
  updateUser: (req, res) => {
    const toString = (object) => {
      const arr = [];

      for (let key in object) {
        if (object.hasOwnProperty(key)) {
          arr.push(`${key} = ${db.escape(object[key])}`);
        }
      }

      return arr.join(", ");
    };

    db.query(
      `UPDATE Students SET ${toString(req.body)} WHERE id = ${req.params.id}`,
      (err, result) => {
        if (err) {
          res.status(400).send({ message: err.message });
          console.log(toString(req.body));
        } else {
          res.status(200).send({
            status: "Success",
            data: result,
          });
        }
      }
    );
  },
};
