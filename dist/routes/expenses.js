"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { Expense } = require("../models");
const router = express.Router();
// GET all expenses
router.get("/", async (_req, res) => {
    try {
        const expenses = await Expense.findAll();
        res.json(expenses);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch expenses", details: err });
    }
});
//GET expense by id
router.get("/:id", async (req, res) => {
    try {
        const expense = await Expense.findByPk(req.params.id);
        if (expense) {
            res.json(expense);
        }
        else {
            res.status(404).json({ error: "Expense not found" });
        }
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch expense", details: err });
    }
});
// POST create new expense
router.post("/", async (req, res) => {
    try {
        const expense = await Expense.create(req.body);
        res.status(201).json(expense);
    }
    catch (err) {
        res.status(400).json({ error: "Failed to create response", details: err });
    }
});
// PUT update expense
router.put("/:id", async (req, res) => {
    try {
        const expense = await Expense.findByPk(req.params.id);
        if (expense) {
            await expense.update(req.body);
            res.json(expense);
        }
        else {
            res.status(404).json({ error: "Expense not found" });
        }
    }
    catch (err) {
        res.status(400).json({ error: "Failed to update expense", details: err });
    }
});
// DELETE expense
router.delete("/:id", async (req, res) => {
    try {
        const expense = await Expense.findByPk(req.params.id);
        if (expense) {
            await expense.destroy();
            res.json({ message: "Expense deleted" });
        }
        else {
            res.status(404).json({ error: "Expense not found" });
        }
    }
    catch (err) {
        res.status(500).json({ error: "Failed to delete expense", details: err });
    }
});
module.exports = router;
//# sourceMappingURL=expenses.js.map