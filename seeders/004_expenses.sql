-- Assuming budget IDs 1, 2, 3 and category IDs 1, 2, 3 exist
INSERT INTO expenses (name, amount, date, "budgetId", "categoryId") VALUES
('Lunch', 15.5, '2025-08-22', 1, 1),
('Train Ticket', 50, '2025-08-21', 2, 2),
('Movie', 12, '2025-08-20', 3, 3)
ON CONFLICT DO NOTHING;
