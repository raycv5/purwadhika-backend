const express = require("express");
const PORT = 2000;

const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
  res.send(`This is Express API`);
});

app.post("/api", (req, res) => {
  console.log(req);
  res.send("This is API method POST");
});

const data = [
  { id: 1, username: "user1", password: "asd" },
  { id: 2, username: "user2", password: "asd" },
  { id: 3, username: "user3", password: "asd" },
];

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
