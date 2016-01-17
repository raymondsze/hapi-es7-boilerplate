# hapi-es7-boilerplate
A Hapi boilerplate restful api server using ECMAScript 7
# Plugins
## Self written
"hapi-async-methods" (Written by me, to import methods from package with async style)
"hapi-async-routes" (Written by me, to import route handlers from package with async style)
"hapi-jwt-token" (Written by me, combine with hapi-auth-jwt2 for easier access token validation)
"hapi-mongoose-bluebird" (Written by me, connect to mongo and get the bluebird promise, enable accessibility to models from server)
All of the above are MIT licences, you can use them in you own project.
## Third party
"crumb" (Protect csrf, currently disabled because of test cases)
"good" (Hapi official plugin for logger)
"good-winston-reporter" (Winston reporter for good)
"hapi-auth-jwt2" (Enable user validation by access token (jsonwebtoken))
"hapi-authorization" (Enable role based acl)

## Validator
"joi"

# Build tool
## "babel"
## "babel-preset-es2015-node5" (To make sure babel would not mistakenly transform generater that node5 already support)
## "babel-preset-stage-0" (To enable async, await)
## "babel-register" (Require hook for backend)

# Test tool
## "lab" 
## "code"

# Lint tool
## "eslint"
## "babel-eslint" (Parser for eslint using babel as transformer)

# Other self written lib
## "import-directory" (Same as require-directory but take module.default (ES6 export default syntax) to concern)

# Database
## redis (Turn it on on localhost with port 6347, it is used fo catbox-redis to cache the user access token)
## mongodb (Turn it on localhost with port 27017, it is used to store User)

# How to get it works
## 1. git clone
## 2. npm install
## 3. install mongo and redis, start both of them. (See Database section)
## 4. npm run test, make sure all test cases passed.
## 5. insert an admin User to mongodb, collection: User, {
  email: 'admin@admin.com',
  username: 'admin',
  password: 'admin1234',
  role: 'ADMIN'
}
## 6. start server by node ./server.js
## 7. open postman or other tools to test API List

# API List
# POST http://localhost:8080/login , {email: ..., password: ...}, return {access-token: ....}
(Please copy the access-token for later use, I have not enable set-cookie, you need to put the access-token to header: authorization for every later api)
# GET http://localhost:8080/users, return whole list of user
# POST http://localhost:8080/users,  {email: ..., password: ..., role: ..., username: ...}, return created user
# GET http://localhost:8080/users/{userId}, return user
# PUT http://localhost:8080/users/{userId}, (limited to ADMIN role if update other user) {email: ..., password: ..., role: ..., username: ...}, return updated user
# DELETE http://localhost:8080/users/{userId}, (limited to ADMIN role) return deleted user
# GET/POST http://localhost:8080/logout
