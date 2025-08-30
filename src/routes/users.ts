const express = require("express");
const { User,
createUser,
getUserById,
getUsers,
updateUser,
deleteUser,
 } = require("../models");

const router = express.Router();

// GET all users
router.get("/", async (_req: any, res: any) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);

    res.status(500).json({ error: "Failed to fetch users", details: err });
  }
});

// GET user by id
router.get("/:id", async (req: any, res: any) => {
  try {
    const user = await getUserById(parseInt(req.params.id));
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user", details: err });
  }
});

// POST create new user
router.post("/", async (req: any, res: any) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: "Failed to create user", details: err });
  }
});

// PUT update a user
router.put("/:id", async (req: any, res: any) => {
  try {
    const user = await updateUser(parseInt(req.params.id));
    if (user) {
      await user.update(req.body);
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ error: "Failed to update user", details: err });
  }
});

// DELETE a user
router.delete("/:id", async (req: any, res: any) => {
  try {
    const user = await deleteUser(parseInt(req.params.id));
    if (user) {
      await user.destroy();
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user", details: err });
  }
});

module.exports = router;
