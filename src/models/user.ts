import { pool } from "../db";

// interface for User
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}


// Create a new user
export async function createUser(user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
  const { username, email, password } = user;
  const res = await pool.query(
    `INSERT INTO users (username, email, password, "createdAt", "updatedAt")
     VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *`,
    [username, email, password]
  );
  return res.rows[0];
}

// Get all users
export async function getUsers(): Promise<User[]> {
  const res = await pool.query("SELECT * FROM users");
  return res.rows;
}

// Get a single user by ID
export async function getUserById(id: number): Promise<User | null> {
  const res = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return res.rows[0] || null;
}

// Update a user
export async function updateUser(id: number, updates: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>): Promise<User | null> {
  const fields = Object.keys(updates);
  if (fields.length === 0) return null;

  const setClause = fields.map((f, idx) => `"${f}" = $${idx + 1}`).join(", ");
  const values = Object.values(updates);

  const res = await pool.query(
    `UPDATE users SET ${setClause}, "updatedAt" = NOW() WHERE id = $${fields.length + 1} RETURNING *`,
    [...values, id]
  );

  return res.rows[0] || null;
}

// Delete a user
export async function deleteUser(id: number): Promise<boolean> {
    const res = await pool.query("DELETE FROM users WHERE id = $1", [id]);
    return (res.rowCount ?? 0) > 0; // if rowCount is null, treat as 0
  }
