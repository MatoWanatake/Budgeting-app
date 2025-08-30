import { pool } from "../db";

// TypeScript interface for Category
export interface Category {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}



// Create a new category
export async function createCategory(category: Omit<Category, "id" | "createdAt" | "updatedAt">): Promise<Category> {
  const { name } = category;
  const res = await pool.query(
    `INSERT INTO categories (name, "createdAt", "updatedAt")
     VALUES ($1, NOW(), NOW()) RETURNING *`,
    [name]
  );
  return res.rows[0];
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  const res = await pool.query("SELECT * FROM categories");
  return res.rows;
}

// Get category by ID
export async function getCategoryById(id: number): Promise<Category | null> {
  const res = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
  return res.rows[0] || null;
}

// Update a category
export async function updateCategory(
  id: number,
  updates: Partial<Omit<Category, "id" | "createdAt" | "updatedAt">>
): Promise<Category | null> {
  const fields = Object.keys(updates);
  if (fields.length === 0) return null;

  const setClause = fields.map((f, idx) => `"${f}" = $${idx + 1}`).join(", ");
  const values = Object.values(updates);

  const res = await pool.query(
    `UPDATE categories SET ${setClause}, "updatedAt" = NOW() WHERE id = $${fields.length + 1} RETURNING *`,
    [...values, id]
  );

  return res.rows[0] || null;
}

// Delete a category
export async function deleteCategory(id: number): Promise<boolean> {
  const res = await pool.query("DELETE FROM categories WHERE id = $1", [id]);
  return (res.rowCount ?? 0) > 0;
}
