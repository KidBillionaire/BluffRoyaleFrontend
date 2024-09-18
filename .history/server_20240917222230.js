const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',   // replace if necessary
  password: '',   // leave empty if you have no password
  database: 'bluff_royale'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Route to save email
app.post('/submit-email', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send('Email is required');
  }

  const query = 'INSERT INTO email_submissions (email) VALUES (?)';
  db.query(query, [email], (err, result) => {
    if (err) {
      return res.status(500).send('Failed to save email');
    }
    res.json({ message: 'Email successfully saved!' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
