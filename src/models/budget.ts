import { pool } from "../db";

export interface Budget {
  id: number;
  name: string;
  totalAmount: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

// Create a new budget
export async function createBudget(budget: Omit<Budget, "id" | "createdAt" | "updatedAt">): Promise<Budget> {
  const { name, totalAmount, userId } = budget;
  const res = await pool.query(
    `INSERT INTO budgets (name, "totalAmount", "userId", "createdAt", "updatedAt")
     VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *`,
    [name, totalAmount, userId]
  );
  return res.rows[0];
}

// Get all budgets
export async function getBudgets(): Promise<Budget[]> {
  const res = await pool.query("SELECT * FROM budgets");
  return res.rows;
}

// Get a single budget by ID
export async function getBudgetById(id: number): Promise<Budget | null> {
  const res = await pool.query("SELECT * FROM budgets WHERE id = $1", [id]);
  return res.rows[0] || null;
}

// Update a budget
export async function updateBudget(
  id: number,
  updates: Partial<Omit<Budget, "id" | "createdAt" | "updatedAt">>
): Promise<Budget | null> {
  const fields = Object.keys(updates);
  if (fields.length === 0) return null;

  const setClause = fields.map((f, idx) => `"${f}" = $${idx + 1}`).join(", ");
  const values = Object.values(updates);

  const res = await pool.query(
    `UPDATE budgets SET ${setClause}, "updatedAt" = NOW() WHERE id = $${fields.length + 1} RETURNING *`,
    [...values, id]
  );

  return res.rows[0];
}

// Delete a budget
export async function deleteBudget(id: number): Promise<boolean> {
  const res = await pool.query("DELETE FROM budgets WHERE id = $1", [id]);
  return (res.rowCount ?? 0) > 0;
}
