'use strict';
const express = require('express')
const bodyParser = require('body-parser')
// What does this line of code do?
router.use(bodyParser.json());
const router = express.Router();

// login
router.post('/login', (req, res) => {
  res.json({ok: true});
})
// register
router.post('/register', (req, res) => {
  res.json({ok: true});
})
// Export router
module.exports = {router};
