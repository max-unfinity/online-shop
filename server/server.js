const express = require("express");
const mysql = require("mysql");
const path = require("path");
const app = express();
const port = 3000;

// MySQL connection
const connection = mysql.createConnection({
  host: "db",
  user: "root",
  password: "root",
  database: "online_shop",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }
  console.log("Connected to database with ID " + connection.threadId);
});

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json()); // For parsing application/json
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Optional: Define a root route (can redirect to 'index.html')
app.get("/", (req, res) => {
  res.redirect("/index.html");
});

// Route to get all categories
app.get('/api/categories', (req, res) => {
  connection.query('SELECT * FROM categories', (error, results) => {
    if (error) {
      res.status(500).send(error);
      return;
    }
    res.json(results);
  });
});

// Route to get subcategories by category
app.get('/api/subcategories', (req, res) => {
  const { category } = req.query;
  const query = 'SELECT * FROM subcategories WHERE category_id = ?';
  connection.query(query, [category], (error, results) => {
    if (error) {
      res.status(500).send(error);
      return;
    }
    res.json(results);
  });
});

// Route to get products by subcategory
app.get('/api/products', (req, res) => {
  let query = 'SELECT * FROM products';
  const subcategory = req.query.subcategory;

  if (subcategory) {
    query += ' WHERE subcategory_id = ' + mysql.escape(subcategory);
  }

  connection.query(query, (error, results) => {
    if (error) res.status(500).send(error);
    res.json(results);
  });
});

// Route to create a new product
app.post('/api/products', (req, res) => {
  const { name, category, description, price, imageUrl } = req.body;
  const query = 'INSERT INTO products (name, category, description, price, image_url) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [name, category, description, price, imageUrl], (error, results) => {
      if (error) res.status(500).send(error);
      res.json({ id: results.insertId });
  });
});

// Route to update a product
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, category, description, price, imageUrl } = req.body;
  const query = 'UPDATE products SET name = ?, category = ?, description = ?, price = ?, image_url = ? WHERE id = ?';

  connection.query(query, [name, category, description, price, imageUrl, id], (error, results) => {
      if (error) {
          res.status(500).send(error);
          return;
      }
      res.json({ message: 'Product updated successfully' });
  });
});

// Route to delete a product
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM products WHERE id = ?';

  connection.query(query, [id], (error, results) => {
      if (error) {
          res.status(500).send(error);
          return;
      }
      res.json({ message: 'Product deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
