const express = require("express");
const {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
} = require("../models/budget");

const router = express.Router();

// GET all budgets
router.get("/", async (_req: any, res: any) => {
  try {
    const budgets = await getBudgets();
    res.json(budgets);
  } catch (err) {
    console.error("Error fetching budgets:", err);
    res.status(500).json({ error: "Failed to fetch budgets", details: err });
  }
});

// GET budget by id
router.get("/:id", async (req: any, res: any) => {
  try {
    const budget = await getBudgetById(parseInt(req.params.id));
    if (budget) {
      res.json(budget);
    } else {
      res.status(404).json({ error: "Budget not found" });
    }
  } catch (err) {
    console.error("Error fetching budget:", err);
    res.status(500).json({ error: "Failed to fetch budget", details: err });
  }
});

// POST new budget
router.post("/", async (req: any, res: any) => {
  try {
    const budget = await createBudget(req.body);
    res.status(201).json(budget);
  } catch (err) {
    console.error("Error creating budget:", err);
    res.status(400).json({ error: "Failed to create budget", details: err });
  }
});

// PUT update budget
router.put("/:id", async (req: any, res: any) => {
  try {
    const budget = await updateBudget(parseInt(req.params.id), req.body);
    if (budget) {
      res.json(budget);
    } else {
      res.status(404).json({ error: "Budget not found or no updates provided" });
    }
  } catch (err) {
    console.error("Error updating budget:", err);
    res.status(500).json({ error: "Failed to update budget", details: err });
  }
});

// DELETE budget
router.delete("/:id", async (req: any, res: any) => {
  try {
    const deleted = await deleteBudget(parseInt(req.params.id));
    if (deleted) {
      res.json({ message: "Budget deleted" });
    } else {
      res.status(404).json({ error: "Budget not found" });
    }
  } catch (err) {
    console.error("Error deleting budget:", err);
    res.status(500).json({ error: "Failed to delete budget", details: err });
  }
});

module.exports = router;
