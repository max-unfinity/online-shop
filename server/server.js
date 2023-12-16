const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// MySQL connection
const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'online_shop'
});

connection.connect(err => {
  if (err) {
      console.error('Error connecting to the database: ' + err.stack);
      return;
  }
  console.log('Connected to database with ID ' + connection.threadId);
});

// Enable CORS for client-side
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// API endpoint to fetch products
app.get('/api/products', (req, res) => {
  connection.query('SELECT * FROM products', (error, results) => {
    if (error) res.status(500).send(error);
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
