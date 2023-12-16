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
app.get("/api/products", (req, res) => {
    connection.query("SELECT * FROM products", (error, results) => {
      if (error) {
        console.error("Error fetching products AAA:", error);
        res.status(500).json({ error: error.message, sqlMessage: error.sqlMessage });
        return;
      }
      res.json(results);
    });
  });
  

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});