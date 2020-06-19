let jwt = require('jsonwebtoken'),
  config = require('../../server/config'),
  bcrypt = require('bcrypt'),
  userRepo = require('../../dbLayer/repositories/usersRepositories');

/**
 * It will register the new user
 * @param req
 * @param res
 * @return json
 */
exports.signUp = async function (req, res) {
  try {
    let { email, password, username, address } = req.body;
    let missingParam = email ? password ? address ? username ? null :
      "username" : "address" : "password" : "email";

    if (missingParam) {
      return res.status(400).json({
        message: `Field ${missingParam} is missing`,
        location: "body"
      });
    }
    let encryptedPassword = await generateEncryptedPassword(password);
    //save user into the database
    userRepo.saveUser({
      email, password: encryptedPassword, address, username
    }, function (err, data) {
      if (err) {
        if (err.errmsg && err.errmsg.substring(0, config.errMessageLength) === config.errMessage) {
          return res.status(409).json({
            message: 'User with same username found, Please Login'
          });
        }
        return res.status(500).json({
          message: 'An Error has occurred',
          error: err
        });
      }
      if (data && !data.errors && data._doc && data._doc.email) return res.json({
        statusCode: true,
        body: {
          message: "new user created"
        }
      });

      return res.status(201).json({
        statusCode: 201,
        body: {
          message: "new user created"
        }
      });
    });
  } catch (err) {
    return res.status(500).json({
      message: 'An Error has occurred',
      error: String(err)
    });
  }
};

/**
 * It will login the user and generate a token
 * @param req
 * @param res
 * @return json
 */
exports.login = function (req, res) {
  try {

    let { username, password } = req.body;
    password = String(password);
    let missingParam = password ? username ? null : "username" : "password";
    if (missingParam) {
      return res.status(400).json({
        message: `Field ${missingParam} is missing`,
        location: "body"
      });
    }
    userRepo.getUser({ username }, async function (err, data) {
      if (err) {
        return res.status(500).json({
          statusCode: 500,
          message: 'An Error occurred',
          error: err
        });
      }
      if (!data || !data.password) return res.status(403).json({
        statusCode: 403,
        message: `Incorrect username/password, if not registered please register first`,
      });
      
      await bcrypt.compare(
        String(password),
        String(data.password)
      )

      let token = jwt.sign({ username, id: data.id },
        config.secretKey,
        {
          expiresIn: config.tokenExpireTime
        }
      );
      // return the access token for the future API calls
      return res.json({
        statusCode: 200,
        "body": {
          "message": "success",
          "accessToken": token
        }
      });
    });
  } catch (err) {
    return res.status(500).json({
      message: 'An Error occurred',
      error: String(err)
    })
  }
};

/**
 * It will GenerateEncryptedPassword, as it's illegal to save users password
 * So, A has will be returned from here and it will be saved in DB
 * @param password
 * @return hash
 */
async function generateEncryptedPassword(password) {
  password = String(password);
  return await bcrypt.hash(password, config["salt_rounds"]);
}