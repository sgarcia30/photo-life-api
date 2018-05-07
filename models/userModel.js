'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {EntrySchema} = require('./entryModel.js');

// Sets up the UserSchema
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
  entries: [EntrySchema]
})

// Serializes the user info to protect sensitive info
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

// Creates the name and setup for the user model
const User = mongoose.model('User', UserSchema);

// Export the User model
module.exports = {User};
