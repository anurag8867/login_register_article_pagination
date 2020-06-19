'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  address: {
    type: String,
  },
  username: {
    type: String,
  }
});
UserSchema.index({ "username": 1 }, { unique: true });

module.exports = mongoose.model('Users', UserSchema);
