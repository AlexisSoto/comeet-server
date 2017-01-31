/**
 * Created by Mika on 10/11/16.
 */
/**
 * Created by Mika on 7/25/2016.
 * /services and /services/* pages
 */
import {
  checkToken
} from '../functions/user';

var express = require('express'),
  router = express.Router()

import {
  User
} from '../mongoose/model/comeet';
router.all('/', function (req, res, next) { // Do something for all /me
  next();
});

router.get('/', function (req, res) {

  checkToken(req.query.token, (err, user) => {
    if (err) {
      console.log(err);
      res.sendStatus(401);
      res.end();
    } else {
      res.send(user);
      res.end();
      return;

    }
  });

});

router.put('/', function (req, res) {
  let eventInfos = {};
  eventInfos = req.body;

  checkToken(req.query.token, (err, user) => {
    if (err) {
      res.sendStatus(401);
      res.end();
    } else {
      User.findOneAndUpdate({_id: user._id},{$set: eventInfos},{new: false},(err,result)=>{
        if(err)
          console.log(err)
        res.send(result);
        res.end();
        return;
      });
    }
  });
});


module.exports = router