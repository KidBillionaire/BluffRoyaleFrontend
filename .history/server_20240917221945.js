const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'bluff_royale'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Example query
connection.query('SELECT 1 + 1 AS solution', (error, results) => {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

// Close the connection when done
connection.end();
