// server.js
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const emojiesRouter = require('./routes/emojiesTranslator');
const port = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/emoji', emojiesRouter);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
