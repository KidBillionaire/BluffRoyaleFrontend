const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');  // CORS, if needed

const app = express();
const port = 3001;

// Middleware
app.use(express.json()); // To parse incoming JSON requests
app.use(cors());  // CORS support for cross-origin requests

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',  // Your MySQL password (empty if none)
    database: 'bluff_royale'
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// POST route to handle email and password submission
app.post('/submit-email', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;  // Make sure both fields exist in the frontend form
  
    // Ensure SQL query matches the columns in your database
    const query = 'INSERT INTO email_submissions (email, password) VALUES (?, ?)';
    connection.query(query, [email, password], (err, result) => {
      if (err) {
        console.error('Error: ', err);
        return res.status(500).send('Error submitting email and password');
      }
      res.status(200).send('Email and password submitted successfully');
    });
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
