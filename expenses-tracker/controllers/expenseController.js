const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "..", "database", "expenses.json");
const data = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));

const getExpenses = (req, res) => {
  res.json(data);
};

const getExpenseDetails = (req, res) => {
  const expense = data.find((e) => e.id === parseInt(req.params.id));
  if (expense) {
    res.json(expense);
  } else {
    res.status(404).json({ message: "Expense not found" });
  }
};

const createExpense = (req, res) => {
  const newExpense = req.body;
  newExpense.id = data.length + 1;
  data.push(newExpense);
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  res.json(newExpense);
};

const editExpense = (req, res) => {
  const updateExpense = req.body;
  const index = data.findIndex((e) => e.id === parseInt(req.params.id));
  if (index !== 1) {
    data[index] = updateExpense;
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    res.json(updateExpense);
  } else {
    res.status(404).json({ message: "Expense not found" });
  }
};

const deleteExpense = (req, res) => {
  const index = data.findIndex((e) => e.id === parseInt(req.params.id));
  if (index !== -1) {
    const deletedExpense = data.splice(index, 1)[0];
    fs.writeFileSync(dataFilePath, JSON.stringify(data.null, 2));
    res.json(deletedExpense);
  } else {
    res.status(404).json({ message: "Expense not found" });
  }
};
