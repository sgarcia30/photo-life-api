'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });
const { User } = require('../models/userModel')
const fileUpload = require('express-fileupload');
const moment = require('moment');

router.use(fileUpload());
router.use(jwtAuth);
router.use(bodyParser.json());


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
router.post('/:userId', (req, res) => {
  // url for my image
  const imgPath = `${__dirname}/images/${req.files.file.name}`;
  const imageFile = req.files.file;
  const entry = {
    photo: imgPath,
    caption: req.files.filecaption,
    date: moment()
  }
  console.log(entry)
  console.log(req.files)
  imageFile.mv(imgPath)
  .then(() => {
    User.findById(req.params.userId)
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
  .catch(err => res.status(500).json({
    message: 'Internal server error'
  }))
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
