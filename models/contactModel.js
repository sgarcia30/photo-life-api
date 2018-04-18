'use strict';
const mongoose = require('mongoose');

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

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = {Contact, ContactSchema};
