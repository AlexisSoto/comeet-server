import express  from 'express';
import session from 'express-session';
import FB from 'fb';
import TokenGenerator from 'uuid-token-generator';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/comeet');
import {User, TokenUser} from './mongoose/model/comeet';
import {createUser, generateToken, updateFbToken} from './user';


var app = express();
FB.options({version: 'v2.8'});

var sess = {
  secret: 'keyboard cat',
  proxy:true,
  resave: false,
  saveUninitialized: false
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(session(sess));

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

app.use(function (req, res, next) {

  if (!req.query.token) { // can't access without token
    if (req.originalUrl == '/login') { // can access /login without token
      next();
    }
    else {
      res.sendStatus(401);
      res.end();
    }
  }
  else {
    next();
  }
});
// Access the session as req.session
app.post('/login', function (req, res) {
  const sess = req.session;
  const fbToken = req.body.fbToken;

  FB.setAccessToken(fbToken);
  const fbfields = ['id', 'first_name', 'last_name', 'email', 'birthday', 'picture', 'likes', 'gender', 'location'];

  FB.api('me', {fields: fbfields, access_token: fbToken}, function (fbRes) {
    if (!fbRes || fbRes.error) {
      console.log(!fbRes ? 'error occurred' : res.error);
      console.log('coucou')
      var error = true;
      res.sendStatus(401);
      res.end();
      return;
    }
    User.findOne({fbId: fbRes.id}, (err, result)=> { // search if user is already un bdd
      if (err) {
        console.log('err find User ' + err);

        res.sendStatus(500);
        res.end();
        return;
      }
      if (!result) {
        createUser(fbRes, fbToken, (err, userId)=> {
          if (err) {
            console.log('error create user' + err);
            res.sendStatus(500);
            res.end();
            return;
          }
          generateToken(userId, (err, token)=> {
            if (err) {
              console.log('error generate token' + err);
              res.sendStatus(500);
              res.end();
              return;
            }
            res.end(token);
            return;
          });

        });


      }
      else {
        updateFbToken(result._id, fbToken, ()=> {
        });
        generateToken(result._id, (err, token)=> {
          if (err) {
            console.log(err);
            res.sendStatus(500);
            res.end();
            return;
          }
          res.end(token);
          return;
        });

        /*
         TokenUser.find({user: result._id}, (err, result)=> { // search if user is already un bdd
         if (err) {
         console.log('err find TokenUser'+err);

         res.sendStatus(500);
         res.end();
         return;
         }

         if(result<= 0){
         console.log('generate token');
         }
         else{
         const token = result.token;

         console.log(token);

         res.end(token);

         console.log(res.data);
         }
         })
         */

      }
    })

  });


})
;
// app.use('/services', require('./services'))
// app.use('/products', require('./products'))

app.listen(process.env.PORT || 8080);