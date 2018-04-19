'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });
const { User } = require('../models/userModel')
const fileUpload = require('express-fileupload');
const moment = require('moment');
const {API_BASE_URL} = require('../config.js');
const {DIR_URL} = require('../config.js');

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
  const imgPath = `${DIR_URL}/public/images/${req.files.file.name}`;
  console.log(imgPath)
  // console.log(__dirname)
  const imageFile = req.files.file;
  const entry = {
    photo: imgPath,
    caption: '',
    date: moment()
  }

  // console.log(req.files)
  imageFile.mv(imgPath, (err) => {
    console.log('is this part working?')
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
  // .then(() => {
  //
  // })
  // .catch(err => res.status(500).json({
  //   message: 'Internal server error'
  // }))
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
