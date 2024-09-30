// app.js
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static('public'));

// Load the dataset
const rawData = fs.readFileSync('paste.txt');
const dataset = JSON.parse(rawData);
let currentIndex = 0;

// Route to render the radar template
app.get('/', (req, res) => {
  res.render('radar');
});

// API endpoint to get gunshot data
app.get('/api/gunshot', (req, res) => {
  const gunshotData = dataset[currentIndex];
  currentIndex = (currentIndex + 1) % dataset.length;
  res.json(gunshotData);
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});