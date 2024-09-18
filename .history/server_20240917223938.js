const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');  // CORS, if needed

// Middleware
app.use(express.json());
app.use(cors());  // CORS support for cross-origin requests

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // Your MySQL password
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

// Start the server
app.listen(3001, () => {
  console.log('Server running on port 3001');
});

const socket = new WebSocket('ws://localhost:3001');

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});


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
