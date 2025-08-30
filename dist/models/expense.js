"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExpense = createExpense;
exports.getExpenses = getExpenses;
exports.getExpenseById = getExpenseById;
exports.updateExpense = updateExpense;
exports.deleteExpense = deleteExpense;
const db_1 = require("../db");
// Create a new expense
async function createExpense(expense) {
    const { name, amount, date, budgetId, categoryId } = expense;
    const res = await db_1.pool.query(`INSERT INTO expenses (name, amount, date, "budgetId", "categoryId", "createdAt", "updatedAt")
     VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *`, [name, amount, date, budgetId, categoryId]);
    return res.rows[0];
}
// Get all expenses
async function getExpenses() {
    const res = await db_1.pool.query("SELECT * FROM expenses");
    return res.rows;
}
// Get expense by ID
async function getExpenseById(id) {
    const res = await db_1.pool.query("SELECT * FROM expenses WHERE id = $1", [id]);
    return res.rows[0] || null;
}
// Update an expense
async function updateExpense(id, updates) {
    const fields = Object.keys(updates);
    if (fields.length === 0)
        return null;
    const setClause = fields.map((f, idx) => `"${f}" = $${idx + 1}`).join(", ");
    const values = Object.values(updates);
    const res = await db_1.pool.query(`UPDATE expenses SET ${setClause}, "updatedAt" = NOW() WHERE id = $${fields.length + 1} RETURNING *`, [...values, id]);
    return res.rows[0] || null;
}
// Delete an expense
async function deleteExpense(id) {
    var _a;
    const res = await db_1.pool.query("DELETE FROM expenses WHERE id = $1", [id]);
    return ((_a = res.rowCount) !== null && _a !== void 0 ? _a : 0) > 0;
}
//# sourceMappingURL=expense.js.map