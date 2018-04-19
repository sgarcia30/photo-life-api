'use strict';
const mongoose = require('mongoose');

const EntrySchema = mongoose.Schema({
  photo: {
    type: String,
    default: ''
  },
  caption: {
    type: String,
    default: ''
  },
  date: {
    type: String
  }
})

const Entry = mongoose.model('Entry', EntrySchema);

module.exports = {Entry, EntrySchema};
