const express = require("express");
const route = express.Router();
const { getResultHandler } = require('../controller/getResultHandler');

route.get('/result/:mediaId', getResultHandler)

module.exports = route;