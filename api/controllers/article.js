let async = require('async'),
  articleRepo = require('../../dbLayer/repositories/articleRepositories');

/**
 * It will create a new article
 * @param req
 * @param res
 * @return json/Object
 */
exports.createArticle = function (req, res) {
  try {
    let { title, body, author } = req.body
    //save into the database
    articleRepo.saveArticle({ title, body, author, userId: req.decoded.id }, function (err, data) {
      if (err) return res.status(500).json({
        success: false,
        message: 'An Error occurred',
        error: err
      });

      return res.status(201).json({
        statusCode: 201,
        body: {
          message: "new article created"
        }
      });

    });
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      message: "Some error has occurred",
      err: String(err),
    });
  }
};

/**
 * It will get all the articles created by a user w.r.t offset and limit
 * @param req
 * @param res
 * @return json/Object
 */
exports.getArticles = function (req, res) {
  try {
    let { offset = 0, limit = 10 } = req.body;

    //get articles in respect of offset and limit and count of all articles for pagination
    async.parallel({
      articles: function (callback) {
        articleRepo.getArticles({ userId: req.decoded.id, offset, limit }, function (err, data) {
          if (err) return callback(err, null);
          return callback(null, data);
        });
      },
      count: function (callback) {
        articleRepo.count({ userId: req.decoded.id }, function (err, data) {
          if (err) return callback(err, null);
          return callback(null, data);
        });
      },
    }, (err, data) => {
      if (err) return res.status(500).json({
        message: 'An Error occurred',
        error: err
      });
      return res.status(201).json({
        statusCode: 201,
        body: {
          data: filterArticles(data.articles),
          count: data.count
        }
      });
    })
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      message: "Some error has occurred",
      err: String(err),
    });
  }
};

/**
 * It will filter out the keys from the articles response as some of the keys aren't required in
 * response
 * @param req
 * @param res
 * @return Array
 */
function filterArticles(articles) {
  let filteredArticles = [];
  articles.filter((article, index, array) => {
    filteredArticles.push({
      title: article.title,
      body: article.body,
      author: article.author,
    });
  });
  return filteredArticles
}