"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const db_1 = require("../db");
// Create a new user
async function createUser(user) {
    const { username, email, password } = user;
    const res = await db_1.pool.query(`INSERT INTO users (username, email, password, "createdAt", "updatedAt")
     VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *`, [username, email, password]);
    return res.rows[0];
}
// Get all users
async function getUsers() {
    const res = await db_1.pool.query("SELECT * FROM users");
    return res.rows;
}
// Get a single user by ID
async function getUserById(id) {
    const res = await db_1.pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return res.rows[0] || null;
}
// Update a user
async function updateUser(id, updates) {
    const fields = Object.keys(updates);
    if (fields.length === 0)
        return null;
    const setClause = fields.map((f, idx) => `"${f}" = $${idx + 1}`).join(", ");
    const values = Object.values(updates);
    const res = await db_1.pool.query(`UPDATE users SET ${setClause}, "updatedAt" = NOW() WHERE id = $${fields.length + 1} RETURNING *`, [...values, id]);
    return res.rows[0] || null;
}
// Delete a user
async function deleteUser(id) {
    var _a;
    const res = await db_1.pool.query("DELETE FROM users WHERE id = $1", [id]);
    return ((_a = res.rowCount) !== null && _a !== void 0 ? _a : 0) > 0; // if rowCount is null, treat as 0
}
//# sourceMappingURL=user.js.map