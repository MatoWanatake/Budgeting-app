INSERT INTO users (username, email, password) VALUES
('alice', 'alice@example.com', 'password123'),
('bob', 'bob@example.com', 'password123'),
('carol', 'carol@example.com', 'password123')
ON CONFLICT DO NOTHING;
