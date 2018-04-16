'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {ContactSchema} = require('./contactModel.js');
const {EntrySchema} = require('./entryModel.js');

const UserSchema = mongoose.Schema({
  username: {
    type: 'String',
    required: true,
    unique: true
  },
  password: {
    type: 'String',
    required: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  entries: [EntrySchema],
  contacts: [ContactSchema]
})

UserSchema.methods.serialize = function() {
  return {
    username: this.username || '',
    firstName: this.firstName || '',
    lastName: this.lastName || ''
  };
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};
