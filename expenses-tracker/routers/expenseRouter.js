const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

router.get("/expenses", expenseController.getExpenses);
router.get("/expenses/:id", expenseController.getExpenseDetails);
router.post("/expenses", expenseController.createExpense);
router.put("/expenses/:id", expenseController.editExpense);
router.delete("/expenses/:id", expenseController.deleteExpense);

module.exports = router;
