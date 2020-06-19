'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
    default: "No Body Provided"
  },
  author: {
    type: String,
    default: "Unknown"
  },
  userId: {
    type: Schema.ObjectId
  }
});

module.exports = mongoose.model('Article', ArticleSchema);
