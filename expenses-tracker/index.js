const express = require("express");
const app = express();
const expenseRouter = require("./routers/expenseRouter");

app.use(express.json());
app.use(expenseRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
