USE online_shop;

INSERT INTO categories (name) VALUES
('Cases'),
('Headphones'),
('Glasses');

INSERT INTO subcategories (name, category_id) VALUES
('Cases for Samsung', 1),
('Cases for IPhone', 1),
('Wireless Headphones', 2),
('Wire Headphones', 2),
('Glasses for Samsung', 3),
('Glasses for IPhone', 3);

INSERT INTO products (name, subcategory_id, description, price, image_url) VALUES
('Wire Headphones 1', 4, 'Description', 999.99, 'http://example.com/laptop1.jpg'),
('Case for Samsung 1', 1, 'Description', 499.99, 'http://example.com/smartphone1.jpg'),
('Glass for IPhone 1', 6, 'Description', 299.99, 'http://example.com/camera1.jpg'),
('Wireless Headphones', 3, 'Description', 89.99, 'http://example.com/headphones1.jpg');
