const express = require("express");
const PORT = 2000;

const app = express();
app.use(express.json());

const db = require("./database");

db.connect((err) => {
  if (err) console.log(err);
  else console.log(`mysql connected`);
});

const { studentsRouters } = require("./routes");
app.use("/students", studentsRouters);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
