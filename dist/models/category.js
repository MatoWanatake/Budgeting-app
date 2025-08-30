"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = createCategory;
exports.getCategories = getCategories;
exports.getCategoryById = getCategoryById;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;
const db_1 = require("../db");
// Create a new category
async function createCategory(category) {
    const { name } = category;
    const res = await db_1.pool.query(`INSERT INTO categories (name, "createdAt", "updatedAt")
     VALUES ($1, NOW(), NOW()) RETURNING *`, [name]);
    return res.rows[0];
}
// Get all categories
async function getCategories() {
    const res = await db_1.pool.query("SELECT * FROM categories");
    return res.rows;
}
// Get category by ID
async function getCategoryById(id) {
    const res = await db_1.pool.query("SELECT * FROM categories WHERE id = $1", [id]);
    return res.rows[0] || null;
}
// Update a category
async function updateCategory(id, updates) {
    const fields = Object.keys(updates);
    if (fields.length === 0)
        return null;
    const setClause = fields.map((f, idx) => `"${f}" = $${idx + 1}`).join(", ");
    const values = Object.values(updates);
    const res = await db_1.pool.query(`UPDATE categories SET ${setClause}, "updatedAt" = NOW() WHERE id = $${fields.length + 1} RETURNING *`, [...values, id]);
    return res.rows[0] || null;
}
// Delete a category
async function deleteCategory(id) {
    var _a;
    const res = await db_1.pool.query("DELETE FROM categories WHERE id = $1", [id]);
    return ((_a = res.rowCount) !== null && _a !== void 0 ? _a : 0) > 0;
}
//# sourceMappingURL=category.js.map