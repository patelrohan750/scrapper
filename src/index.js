
require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');

// Middleware setup (if any)
app.use(express.json());

// Load routes
app.use('/api', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});