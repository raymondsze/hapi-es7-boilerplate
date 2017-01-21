# hapi-es7-boilerplate
A Hapi boilerplate restful api server using ECMAScript 7
# Plugins
## Self written 
"hapi-async-methods" (Written by me, to import methods from package with async style)<br/>
"hapi-async-routes" (Written by me, to import route handlers from package with async style)<br/>
"hapi-jwt-token" (Written by me, combine with hapi-auth-jwt2 for easier access token validation)<br/>
"hapi-mongoose-bluebird" (Written by me, connect to mongo and get the bluebird promise, enable accessibility to models from server)<br/>
All of the above are MIT licences, you can use them in you own project.<br/>
## Third party
"crumb" (Protect csrf, currently disabled because of test cases)<br/>
"good" (Hapi official plugin for logger)<br/>
"good-winston-reporter" (Winston reporter for good)<br/>
"hapi-auth-jwt2" (Enable user validation by access token (jsonwebtoken))<br/>
"hapi-authorization" (Enable role based acl)<br/>

## Validator
"joi"<br/>

# Build tool
"babel"<br/>
"babel-preset-es2015-node5" (To make sure babel would not mistakenly transform generater that node5 already support)<br/>
"babel-preset-stage-0" (To enable async, await)<br/>
"babel-register" (Require hook for backend)<br/>

# Test tool
"lab"<br/>
"code"<br/>

# Lint tool
"eslint"<br/>
"babel-eslint" (Parser for eslint using babel as transformer)<br/>

# Other self written lib
"import-directory" (Same as require-directory but take module.default (ES6 export default syntax) to concern)<br/>

# Database
redis (Turn it on on localhost with port 6347, it is used fo catbox-redis to cache the user access token)<br/>
mongodb (Turn it on localhost with port 27017, it is used to store User)<br/>

# How to get it works
1. git clone<br/>
2. npm install<br/>
3. install mongo and redis, start both of them. (See Database section)<br/>
4. npm run test, make sure all test cases passed.<br/>
5. insert an admin User to mongodb, collection: User<br/>
{<br/>
  email: 'admin@admin.com',<br/>
  username: 'admin',<br/>
  password: 'admin1234',<br/>
  role: 'ADMIN'<br/>
}<br/>
6. start server by node ./server.js<br/>
7. open postman or other tools to test API List<br/>

# API List
POST http://localhost:8080/login , {email: ..., password: ...}, return {access-token: ....}<br/>
(Please copy the access-token for later use, I have not enable set-cookie, you need to put the access-token to header: authorization for every later api)<br/>
GET http://localhost:8080/users, return whole list of user<br/>
POST http://localhost:8080/users,  {email: ..., password: ..., role: ..., username: ...}, return created user<br/>
GET http://localhost:8080/users/{userId}, return user<br/>
PUT http://localhost:8080/users/{userId}, (limited to ADMIN role if update other user) {email: ..., password: ..., role: ..., username: ...}, return updated user<br/>
DELETE http://localhost:8080/users/{userId}, (limited to ADMIN role) return deleted user<br/>
GET/POST http://localhost:8080/logout<br/>
