const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv-safe');
const database = require('./database/mongoConfig');

const users = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

/* rotas */
app.use('/api/users', users);

dotenv.config();

database.connect();

module.exports = app;