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

// POST route to handle email submission
app.post('/submit-email', (req, res) => {
  const email = req.body.email;

  console.log('Received email:', email); // Logging received email

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const query = 'INSERT INTO email_submissions (email) VALUES (?)';
  connection.query(query, [email], (error, results) => {
    if (error) {
      console.error('Error inserting email:', error);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json({ message: 'Email successfully submitted' });
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
