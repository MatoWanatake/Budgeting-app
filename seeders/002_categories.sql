INSERT INTO categories (name) VALUES
('Food'),
('Transport'),
('Entertainment')
ON CONFLICT DO NOTHING;
