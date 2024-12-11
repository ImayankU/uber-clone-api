const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectToDb = require('./db/db'); // Import the DB connection module
const userRoutes = require('./routes/user.routes');

// Connect to the database
connectToDb();

// Middleware and routes setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/users', userRoutes);

module.exports = app;
