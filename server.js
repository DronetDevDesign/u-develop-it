// import mysql2 from node_modules file:
const mysql = require('mysql2');

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
// return data from candidates table for ALL candidates:
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//   console.log(rows);
// });

// GET a single candidate:
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(row);
// });

// Delete a candidate:
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// Create a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
//               VALUES (?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });
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