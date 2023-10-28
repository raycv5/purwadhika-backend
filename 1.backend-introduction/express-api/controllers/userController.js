const data = [
  { id: 1, username: "user1", password: "asd" },
  { id: 2, username: "user2", password: "asd" },
  { id: 3, username: "user3", password: "asd" },
];

module.exports = {
  getAll: (req, res) => {
    res.status(201).send(data);
  },
};
