const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const upload = multer();

// Enable CORS for all routes

const app = express();
const port = 3000;

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://127.0.0.1:5500' // Replace with your client's URL
}));


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
  const { fullName, email, password } = req.body;
  const query = 'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)';

  connection.query(query, [fullName, email, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json({ success: true });
      res.status(200).send('Data inserted');
    }
  });
});

app.post('/login', upload.none(), (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';

  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    // Check if the user exists
    if (results.length === 0) {
      // No user found with that email
      return res.status(401).send('Email not found. Please sign up.');
    }

    const user = results[0];

    // TODO: Compare the provided password with the hashed password (assuming plain text for now)
    if (user.password === password) {
      res.json({ success: true });
    } else {
      // Passwords do not match
      res.status(401).send('Incorrect password. Please try again.');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
