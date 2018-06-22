'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });
const { User } = require('../models/userModel')
const fileUpload = require('express-fileupload');
const moment = require('moment');
const {DIR_URL} = require('../config.js');
// Tell the router to use 'fileUpload', the 'jwtAuth', and 'bodyParser'
router.use(fileUpload());
router.use(jwtAuth);
router.use(bodyParser.json());

// GET the user's entries
router.get('/:userId', (req, res) => {
  User.findById(req.params.userId)
  .then(user => {
    res.json(user.entries)
  })
  .catch(err => res.status(500).json({
    message: 'Internal server error'
  }));
})

// POST photos & captions
router.post('/:userId', (req, res) => {
  const entry = {
    photo: req.body.file,
    caption: req.body.caption,
    date: moment(),
    editable: false
  }
  User.findById(req.params.userId)
    .then(user => {
      user.entries.push(entry);
      user.save(err => {
        res.json(user);
      })
    })
    .catch(err => res.status(500).json({
      message: 'Internal server error'
    }))
})

// DELETE an entry
router.delete('/:userId/:postId', (req, res) => {
  const postId = req.params.postId;
  User.findById(req.params.userId)
  .then(user => {
    user.entries.id(postId).remove();
    user.save(err => {
        if (err) {
          res.send(err)
        }
        res.json(user.entries)
      })
  })
  .catch(err => res.status(500).json({
    message: 'Internal server error'
  }))
})

// PUT endpoint that updates an entry caption
router.put('/:userId/:postId', (req, res) => {
  const postId = req.params.postId;
  User.findById(req.params.userId)
  .then(user => {
    const entry = user.entries.id(postId);
    entry.caption = req.body.caption;
    user.save(err => {
      if (err) {
        res.send(err)
      }
      res.json(user)
    })
  })
})

// Export router
module.exports = {router};
