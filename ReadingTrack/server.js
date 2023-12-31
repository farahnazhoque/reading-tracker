const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Farahnaz15',
  database: 'readingTracker'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});

// Endpoint to handle POST requests
app.post('/submit-form', (req, res) => {
  console.log("Received a request:", req.body);
  const { fullName, email, password } = req.body;
  const query = 'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)';

  connection.query(query, [fullName, email, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send('Data inserted');
    }
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
