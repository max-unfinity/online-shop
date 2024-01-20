USE online_shop;
SET NAMES utf8mb4;

INSERT INTO categories (name) VALUES
('Чехлы'),
('Наушники'),
('Защитные стёкла');

INSERT INTO subcategories (name, category_id) VALUES
('Samsung', 1),
('IPhone', 1),
('Беспроводные', 2),
('Проводные', 2),
('Samsung', 3),
('IPhone', 3);

INSERT INTO products (name, subcategory_id, description, price, image_url) VALUES
('Наушники внутриканальные Apple EarPods', 4, 'Описание', 2699, 'db/images/headphones_wired.jpg'),
('Case for Samsung 1', 1, 'Description', 499.99, 'http://example.com/smartphone1.jpg'),
('Glass for IPhone 1', 6, 'Description', 299.99, 'http://example.com/camera1.jpg'),
('Wireless Headphones', 3, 'Description', 89.99, 'http://example.com/headphones1.jpg');
