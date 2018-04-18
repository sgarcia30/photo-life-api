'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

// Validates the user password
UserSchema.methods.validatePassword = function(password) {
	return bcrypt.compare(password, this.password);
};

// Creates a hash of the user password to be stored in the backend
UserSchema.statics.hashPassword = function(password) {
	return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};
