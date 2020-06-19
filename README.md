# balancedParenthesisOperationAPI
Postman Link: https://www.getpostman.com/collections/df149a1dba3f34c06e5b

# Api's exposed:
        * POST
                * SignUp -> http://localhost:3500/signUp
                        Protocol: POST
                        Body ->   {
                                    "email": "sindhuanurag2@gmail.com",
                                    "password": "hello123",
                                    "address": "1996-08-25",
                                    "username": "anurag"
                                  }

                * Login -> http://localhost:3500/login
                        Protocol: POST
                         Body -> {"username":"anurag", "password":"hello123"} 

                * Article -> http://localhost:3500/article
                        Protocol: POST
                         Body -> {"username":"anurag", "password":"hello123"} 

                * GET Articles -> http://localhost:3500/articles
                        Protocol: GET
                         Body -> {"access_token":"xyz", "offset": 0, "limit": 2}
                         NOTE: -> `This will fetch only the articles which are added by him`
                               -> `This Will provide you the count as well for pagination purpose`
