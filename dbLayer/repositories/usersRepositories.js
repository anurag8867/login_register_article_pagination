var mongoose = require('mongoose'),
    UserModel = mongoose.model('Users');

exports.saveUser = function (req, next) {
  UserModel.create(req, next);
};


exports.getUser = function (req, next) {
  UserModel.findOne(req, next);
};


