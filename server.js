var mongoose = require('mongoose'),
  articleModel = require('./dbLayer/models/articleModel'),
  userModel = require('./dbLayer/models/userModel');
const express = require('express'),
  bodyParser = require('body-parser'),
  config = require('./dbLayer/config/config.js'),
  port = process.env.PORT || 3500;
let user = require('./api/controllers/users'),
  article = require('./api/controllers/article'),
  middleware = require('./server/middleware');

// Export app for other routes to use
let app = express();

// Starting point of the server
function main() {
  app.use(bodyParser.urlencoded({ // Middleware
    extended: true
  }));
  app.use(bodyParser.json());

  //SignUp
  app.post('/signUp', user.signUp);

  //login
  app.post('/login', user.login);

  //article
  app.post('/article', middleware.checkToken, article.createArticle);

  //article
  app.get('/articles', middleware.checkToken, article.getArticles);

  app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
  });

  // mongoose instance connection url connection
  mongoose.Promise = global.Promise;
  mongoose.connect(config.mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true });
  app.listen(port, () => {
    console.log(`Node.js app is listening at http://localhost:${port}`);
  });

}

main();
