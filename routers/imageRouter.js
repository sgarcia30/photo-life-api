'use strict';
const express = require('express')
const bodyParser = require('body-parser')
// What does this line of code do?
router.use(bodyParser.json());
const router = express.Router()

// add photos & captions
router.post('/', (req, res) => {
  res.json({ok: true});
})
// delete photos
router.delete('/:postId', (req, res) => {
  res.json({ok: true});
})
// update post
router.post('/:postId', (req, res) => {
  res.json({ok: true});
})
// Export router
module.exports = {router};
