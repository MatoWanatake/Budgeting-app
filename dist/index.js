"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (_req, res) => {
    res.send("Budgeting API running!");
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const usersRouter = require("./routes/users");
const budgetsRouter = require("./routes/budgets");
const expensesRouter = require("./routes/expenses");
const categoriesRouter = require("./routes/categories");
app.use("/api/users", usersRouter);
app.use("/api/budgets", budgetsRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/categories", categoriesRouter);
//# sourceMappingURL=index.js.map