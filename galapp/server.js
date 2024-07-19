'use strict';

const express = require('express');
const routes = require('./routes');

// Initializations
const app = express();
require('./config/config');


// Settings
app.set('port', process.env.PORT || 3005);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

// Routes 
app.use(routes);

module.exports = app;