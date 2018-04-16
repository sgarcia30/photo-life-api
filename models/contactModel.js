'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const ModelSchema = mongoose.Schema({
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

module.exports = {Contact};
