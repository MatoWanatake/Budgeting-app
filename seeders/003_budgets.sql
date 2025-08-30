-- Assuming user IDs 1, 2, 3 exist
INSERT INTO budgets (name, "totalAmount", "userId") VALUES
('Monthly Budget', 2000, 1),
('Vacation Budget', 1500, 2),
('Groceries Budget', 500, 3)
ON CONFLICT DO NOTHING;
