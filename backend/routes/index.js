const express = require('express');
const route = express.Router();
const authRoute = require('./auth');
const uploadRoute = require('./upload');
const resultRoute = require('./result');

route.use('/auth',authRoute);
route.use('/upload',uploadRoute);
route.use('/dashboard',resultRoute);

module.exports = route;