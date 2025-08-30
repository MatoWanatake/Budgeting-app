"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { Budget } = require("../models");
const router = express.Router();
// GET all budgets
router.get("/", async (_req, res) => {
    try {
        const budgets = await Budget.findAll();
        res.json(budgets);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch budgets" });
    }
});
// GET budget by id
router.get("/:id", async (req, res) => {
    try {
        const budget = await Budget.findByPk(req.params.id);
        if (budget) {
            res.json(budget);
        }
        else {
            res.status(404).json({ error: "Budget not found" });
        }
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch budget", details: err });
    }
});
// POST new budget
router.post("/", async (req, res) => {
    try {
        const budget = await Budget.create(req.body);
        res.status(201).json(budget);
    }
    catch {
        res.status(400).json({ error: "Failed to create budget" });
    }
});
// PUT update budget
router.put("/:id", async (req, res) => {
    try {
        const budget = Budget.findByPk(req.params.id);
        if (budget) {
            await budget.update(req.body);
            res.json(budget);
        }
        else {
            res.status(400).json({ error: "Failed to update budget" });
        }
    }
    catch (err) {
        res.status(500).json({ error: "Failed to update budget", details: err });
    }
});
// DELETE budget
router.detele("/:id", async (req, res) => {
    try {
        const budget = Budget.findByPk(req.params.id);
        if (budget) {
            await budget.destory();
            res.json({ message: "Budget deleted" });
        }
        else {
            res.status(404).json({ error: "Budget not found" });
        }
    }
    catch (err) {
        res.status(500).json({ error: "Failed to delete budget", details: err });
    }
});
module.exports = router;
//# sourceMappingURL=budgets.js.map