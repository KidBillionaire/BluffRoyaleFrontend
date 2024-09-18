const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3001;
const cors = require('cors');
app.use(cors());


app.use(express.json()); // To parse incoming JSON requests

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'bluff_royale',
  password: '' // No password if you're using root without one
});

connection.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to database.');
  }
});

// POST route to handle email submission
app.post('/submit-email', (req, res) => {
  const email = req.body.email;

  if (email) {
    const query = 'INSERT INTO email_submissions (email) VALUES (?)';
    connection.query(query, [email], (err, result) => {
      if (err) {
        console.error('Error inserting email:', err);
        res.status(500).send({ error: 'Database error' });
      } else {
        res.send({ success: true });
      }
    });
  } else {
    res.status(400).send({ error: 'Invalid email' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
