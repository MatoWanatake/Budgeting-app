import { Request, Response } from "express"

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const usersRouter = require("./routes/users");
const budgetsRouter = require("./routes/budgets");
const expensesRouter = require("./routes/expenses");
const categoriesRouter = require("./routes/categories");

const app = express();

app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/users", usersRouter);
app.use("/api/budgets", budgetsRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/categories", categoriesRouter);

// Test route
app.get("/", (_req: Request, res: Response) => {
  res.send("Budgeting API running!");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
