const express = require("express");
const db = require("./models");

const PORT = 2000;

const app = express();

app.use(express.json());

app.use("/api", (req, res) => {
  console.log("API Test");
});

const { userRouter } = require("./routers");

app.use("/users", userRouter);

app.listen(PORT, () => {
  // db.sequelize.sync({ alter: true });
  console.log(`Server runnig on PORT ${PORT}`);
});
