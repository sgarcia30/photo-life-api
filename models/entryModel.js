'use strict';
const mongoose = require('mongoose');

const EntrySchema = mongoose.Schema({
  photo: {
    type: String,
    default: '',
    required: true
  },
  caption: {
    type: String,
    default: ''
  }
})

const Entry = mongoose.model('Entry', EntrySchema);

module.exports = {Entry, EntrySchema};
