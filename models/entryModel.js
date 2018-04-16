'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const EntrySchema = mongoose.Schema({
  photo: {
    // not sure what should go in here
    type: String,
    default: '',
    required: true
  },
  caption: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    required: true
  }
})

const Entry = mongoose.model('Entry', EntrySchema);

module.exports = {Entry};
