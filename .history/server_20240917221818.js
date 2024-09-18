const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

// Initialize Express App
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:
  database: 'bluff_royale'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database');
});

// Handle POST request for email signup
app.post('/submit-email', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ error: 'Email is required' });
  }

  const query = `INSERT INTO email_submissions (email) VALUES (?)`;

  db.query(query, [email], (err, result) => {
    if (err) {
      console.error('Error inserting email:', err);
      return res.status(500).send({ error: 'Database error' });
    }
    res.status(200).send({ success: 'Email successfully submitted!' });
  });
});

// Start the server
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
