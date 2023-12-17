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

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../public")));

// Optional: Define a root route (can redirect to 'index.html')
app.get("/", (req, res) => {
  res.redirect("/index.html");
});

// Enable CORS for client-side
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// API endpoint to fetch products
app.get('/api/products', (req, res) => {
  let query = 'SELECT * FROM products';
  const category = req.query.category;

  if (category) {
    query += ' WHERE category = ' + mysql.escape(category);
  }

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});

// Route to get all products
app.get('/api/products', (req, res) => {
  connection.query('SELECT * FROM products', (error, results) => {
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
