const express = require('express');
const predictionRoutes = require('./routes/predictionRoutes');
require('dotenv').config();

const app = express();
const port = 8082;

app.use('/', predictionRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
