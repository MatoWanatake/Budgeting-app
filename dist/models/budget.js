"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBudget = createBudget;
exports.getBudgets = getBudgets;
exports.getBudgetById = getBudgetById;
exports.updateBudget = updateBudget;
const db_1 = require("../db");
// Create a new budget
async function createBudget(budget) {
    const { name, totalAmount, userId } = budget;
    const res = await db_1.pool.query(`INSERT INTO budgets (name, "totalAmount", "userId", "createdAt", "updatedAt")
     VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *`, [name, totalAmount, userId]);
    return res.rows[0];
}
// Get all budgets
async function getBudgets() {
    const res = await db_1.pool.query("SELECT * FROM budgets");
    return res.rows;
}
// Get a single budget by ID
async function getBudgetById(id) {
    const res = await db_1.pool.query("SELECT * FROM budgets WHERE id = $1", [id]);
    return res.rows[0] || null;
}
// Update a budget
async function updateBudget(id, updates) {
    const fields = Object.keys(updates);
    if (fields.length === 0)
        return null;
    const setClause = fields.map((f, idx) => `"${f}" = $${idx + 1}`).join(", ");
    const values = Object.values(updates);
    const res = await db_1.pool.query(`UPDATE budgets SET ${setClause}, "updatedAt" = NOW() WHERE id = $${fields.length + 1} RETURNING *`, [...values, id]);
    return res.rows[0];
}
//# sourceMappingURL=budget.js.map