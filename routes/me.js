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
  console.log(req.body);
  eventInfos = req.body;
  let homeLocation = {latitude:eventInfos.latitude,longitude:eventInfos.longitude,altitude:0}
  checkToken(req.query.token, (err, user) => {
    if (err) {
      res.sendStatus(401);
      res.end();
    } else {
      User.findOneAndUpdate({_id: user._id},{$set: {homeLocation}},{new: true},(err,result)=>{
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