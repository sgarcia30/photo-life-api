'use strict';
const express = require('express')
const bodyParser = require('body-parser')
// What does this line of code do?
router.use(bodyParser.json());
const router = express.Router()

// user info
router.get('/:userId', (req, res) => {
  res.json({ok: true});
})

// contacts
router.get('/:userId/contacts', (req, res) => {
  res.json({ok: true});
})

router.post('/:userId/conacts', (req, res) => {
  res.json({ok: true});
})

router.put('/:userId/conacts', (req, res) => {
  res.json({ok: true});
})

router.delete('/:userId/contacts/:contactId', (req, res) => {
  res.json({ok: true});
})
// Export router
module.exports = {router};
