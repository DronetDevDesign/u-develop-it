// starter variables for Express app:
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// express middleware:
app.use(express.urlencoded({ extended: false})); 
app.use(express.json());

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




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});