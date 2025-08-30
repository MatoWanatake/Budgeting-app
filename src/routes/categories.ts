const express = require("express");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../models/category");

const router = express.Router();

// GET all categories
router.get("/", async (_req: any, res: any) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories", details: err });
  }
});

// GET category by id
router.get("/:id", async (req: any, res: any) => {
  try {
    const category = await getCategoryById(parseInt(req.params.id));
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (err) {
    console.error("Error fetching category:", err);
    res.status(500).json({ error: "Failed to fetch category", details: err });
  }
});

// POST new category
router.post("/", async (req: any, res: any) => {
  try {
    const category = await createCategory(req.body);
    res.status(201).json(category);
  } catch (err) {
    console.error("Error creating category:", err);
    res.status(400).json({ error: "Failed to create category", details: err });
  }
});

// PUT update category
router.put("/:id", async (req: any, res: any) => {
  try {
    const category = await updateCategory(parseInt(req.params.id), req.body);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: "Category not found or no updates provided" });
    }
  } catch (err) {
    console.error("Error updating category:", err);
    res.status(500).json({ error: "Failed to update category", details: err });
  }
});

// DELETE category
router.delete("/:id", async (req: any, res: any) => {
  try {
    const deleted = await deleteCategory(parseInt(req.params.id));
    if (deleted) {
      res.json({ message: "Category deleted" });
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).json({ error: "Failed to delete category", details: err });
  }
});

module.exports = router;
