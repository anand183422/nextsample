

USE woodesy;

-- Create Table
CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2)
);

-- Insert Sample Data
INSERT INTO items (name, description, price)
VALUES
('Wooden Chair', 'Comfortable and stylish wooden chair.', 45.00),
('Dining Table', 'Solid oak dining table.', 120.00);

-- Stored Procedure to Fetch Items
DELIMITER $$
CREATE PROCEDURE GetItems()
BEGIN
    SELECT * FROM items;
END $$
DELIMITER ;
