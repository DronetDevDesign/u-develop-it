// import mysql2 from node_modules file:
const mysql = require('mysql2');
// importing JS file provided by client -- used on line 87:
const inputCheck = require('./utils/inputCheck');

// starter variables for Express app:
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// express middleware:
app.use(express.urlencoded({ extended: false})); 
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'Bu$$sawyer2022',
    database: 'election'
  },
  console.log('Connected to the election database.')
);

// ================QUERY STATEMENTS=================
// Get all candidates:
app.get('/api/candidates', (req, res) => {
  const sql = `SELECT candidates.*, parties.name 
             AS party_name 
             FROM candidates 
             LEFT JOIN parties 
             ON candidates.party_id = parties.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// GET a single candidate:
app.get('/api/candidate/:id', (req, res) => {
  const sql = `SELECT candidates.*, parties.name 
             AS party_name 
             FROM candidates 
             LEFT JOIN parties 
             ON candidates.party_id = parties.id 
             WHERE candidates.id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

// Delete a candidate:
app.delete('/api/candidate/:id', (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Candidate not found'
      });
    } else {
      res.json({
        message: 'successfully deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// Create a candidate
app.post('/api/candidate', ({ body }, res) => {
  const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
  VALUES (?,?,?)`;
  const params = [body.first_name, body.last_name, body.industry_connected];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});
// ==================END=================

// 1) get route for Express server:
// Express middleware
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!'
  });
});
// 2) Default response for any other request (Not Found):
// !!! this test route should always goes BELOW the other routes !!!
app.use((req, res) => {
  res.status(404).end();  
});



// PORT now listening:
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});