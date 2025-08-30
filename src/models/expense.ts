import { pool } from "../db";

// TypeScript interface for Expense
export interface Expense {
  id: number;
  name: string;
  amount: number;
  date: string;       // ISO date string
  budgetId: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
}



// Create a new expense
export async function createExpense(expense: Omit<Expense, "id" | "createdAt" | "updatedAt">): Promise<Expense> {
  const { name, amount, date, budgetId, categoryId } = expense;
  const res = await pool.query(
    `INSERT INTO expenses (name, amount, date, "budgetId", "categoryId", "createdAt", "updatedAt")
     VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *`,
    [name, amount, date, budgetId, categoryId]
  );
  return res.rows[0];
}

// Get all expenses
export async function getExpenses(): Promise<Expense[]> {
  const res = await pool.query("SELECT * FROM expenses");
  return res.rows;
}

// Get expense by ID
export async function getExpenseById(id: number): Promise<Expense | null> {
  const res = await pool.query("SELECT * FROM expenses WHERE id = $1", [id]);
  return res.rows[0] || null;
}

// Update an expense
export async function updateExpense(
  id: number,
  updates: Partial<Omit<Expense, "id" | "createdAt" | "updatedAt">>
): Promise<Expense | null> {
  const fields = Object.keys(updates);
  if (fields.length === 0) return null;

  const setClause = fields.map((f, idx) => `"${f}" = $${idx + 1}`).join(", ");
  const values = Object.values(updates);

  const res = await pool.query(
    `UPDATE expenses SET ${setClause}, "updatedAt" = NOW() WHERE id = $${fields.length + 1} RETURNING *`,
    [...values, id]
  );

  return res.rows[0] || null;
}

// Delete an expense
export async function deleteExpense(id: number): Promise<boolean> {
  const res = await pool.query("DELETE FROM expenses WHERE id = $1", [id]);
  return (res.rowCount ?? 0) > 0;
}
