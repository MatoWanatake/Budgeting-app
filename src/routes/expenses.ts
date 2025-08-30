const express = require("express");
const {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require("../models/expense");

const router = express.Router();

// GET all expenses
router.get("/", async (_req: any, res: any) => {
  try {
    const expenses = await getExpenses();
    res.json(expenses);
  } catch (err) {
    console.error("Error fetching expenses:", err);
    res.status(500).json({ error: "Failed to fetch expenses", details: err });
  }
});

// GET expense by id
router.get("/:id", async (req: any, res: any) => {
  try {
    const expense = await getExpenseById(parseInt(req.params.id));
    if (expense) {
      res.json(expense);
    } else {
      res.status(404).json({ error: "Expense not found" });
    }
  } catch (err) {
    console.error("Error fetching expense:", err);
    res.status(500).json({ error: "Failed to fetch expense", details: err });
  }
});

// POST new expense
router.post("/", async (req: any, res: any) => {
  try {
    const expense = await createExpense(req.body);
    res.status(201).json(expense);
  } catch (err) {
    console.error("Error creating expense:", err);
    res.status(400).json({ error: "Failed to create expense", details: err });
  }
});

// PUT update expense
router.put("/:id", async (req: any, res: any) => {
  try {
    const expense = await updateExpense(parseInt(req.params.id), req.body);
    if (expense) {
      res.json(expense);
    } else {
      res.status(404).json({ error: "Expense not found or no updates provided" });
    }
  } catch (err) {
    console.error("Error updating expense:", err);
    res.status(500).json({ error: "Failed to update expense", details: err });
  }
});

// DELETE expense
router.delete("/:id", async (req: any, res: any) => {
  try {
    const deleted = await deleteExpense(parseInt(req.params.id));
    if (deleted) {
      res.json({ message: "Expense deleted" });
    } else {
      res.status(404).json({ error: "Expense not found" });
    }
  } catch (err) {
    console.error("Error deleting expense:", err);
    res.status(500).json({ error: "Failed to delete expense", details: err });
  }
});

module.exports = router;
