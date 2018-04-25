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
router.post('/:userId/:caption', (req, res) => {
  // url for my image
  const imgPath = `${DIR_URL}/public/images/${req.files.file.name}`;
  const imgClientPath = `/public/images/${req.files.file.name}`;
  const imageFile = req.files.file;
  const entry = {
    photo: imgClientPath,
    caption: req.params.caption,
    date: moment().format('ddd MMM DD YYYY'),
    editable: false
  }
  imageFile.mv(imgPath, (err) => {
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
})
// delete entries
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
// update post
router.put('/:userId/:postId', (req, res) => {
  const postId = req.params.postId;
  User.findOneAndUpdate({_id: req.params.userId, 'entries._id': postId},
  {$set: {'entries.$.caption': req.body.caption}},
  {new: true})
  .then(user => {
    res.status(200).json(user);
  })
  .catch(err => res.status(500).json({
    message: 'Internal server error'
  }))
})
// Export router
module.exports = {router};
