"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { Category } = require("../models");
const router = express.Router();
//GET all categories
router.get("/", async (_req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch categories" });
    }
});
//GET all categories by id
router.get("/:id", async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            res.json(category);
        }
        else {
            res.status(404).json({ error: "Category not found" });
        }
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch category", details: err });
    }
});
// POST create new category
router.post("/", async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to create new category", details: err });
    }
});
// PUT update a category
router.put("/:id", async (req, res) => {
    try {
        const category = Category.findByPk(req.params.id);
        if (category) {
            await category.update(req.body);
            res.json(category);
        }
        else {
            res.status(404).json({ error: "Category not found" });
        }
    }
    catch (err) {
        res.status(500).json({ error: "Falied to update category", details: err });
    }
});
// DELETE category
router.delete("/:id", async (req, res) => {
    try {
        const category = Category.findByPk(req.params.id);
        if (category) {
            await category.destory();
            res.json({ message: "Category deleted" });
        }
        else {
            res.status(404).json({ error: "Category not found" });
        }
    }
    catch (err) {
        res.status(500).json({ error: "Failed to delete category", details: err });
    }
});
module.exports = router;
//# sourceMappingURL=categories.js.map