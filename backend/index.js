const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
app.use(cors());

const PORT = 8000;

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Create a route to fetch data from the database
app.get("/get", (req, res) => {
  const q = `SELECT * FROM items`;

  // Execute the SQL query to fetch data
  db.query(q, (err, result) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      return res.status(500).json({ error: 'Failed to fetch data' });
    }
    console.log('Data fetched successfully');
    return res.json(result);
  });
});

// Root route
app.get("/", (req, res) => {
  res.json("Hello, this is the backend");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
