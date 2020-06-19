var mongoose = require('mongoose'),
  articleModel = mongoose.model('Article');

exports.saveArticle = function (req, next) {
  articleModel.create(req, next);
};

exports.getArticles = function ({ userId, offset = 0, limit = 10 }, next) {
  articleModel.find({ userId }, next).skip(offset).limit(limit);
};

exports.count = function ({ userId }, next) {
  articleModel.countDocuments({ userId }, next);
};
