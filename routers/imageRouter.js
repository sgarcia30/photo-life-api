'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });
router.use(jwtAuth);
const { User } = require('../models/userModel')


// get entries
router.get('/:userId', (req, res) => {
  User.findById(req.params.userId)
  .then(user => {
    res.json(user.entries)
  })
  .catch(err => res.status(500).json({
    message: 'Internal server error'
  }));
})
// add photos & captions
router.post('/', (req, res) => {
  const entry = {
    photo: '',
    caption: req.body.caption
  }

  User.findById(req.body.userId)
  .then(user => {
    user.entries.push(entry);
    user.save(err => {
      if (err) {
        res.send(err)
      }
      res.json(user);
    })
  })
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
