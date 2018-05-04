'use strict';
const mongoose = require('mongoose');

// Set up the EntrySchema
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
  },
  editable: {
    type: Boolean
  }
})

// Creates the name and setup for the EntrySchema
const Entry = mongoose.model('Entry', EntrySchema);

// Export the Entry model and EntrySchema
module.exports = {Entry, EntrySchema};
