'use strict';
const mongoose = require('mongoose');

// Set up the Contact schema
const ContactSchema = mongoose.Schema({
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true
  }
})

// Creates the name and setup for the Contact model
const Contact = mongoose.model('Contact', ContactSchema);

// Exports the Contact and ContactSchema
module.exports = {Contact, ContactSchema};
