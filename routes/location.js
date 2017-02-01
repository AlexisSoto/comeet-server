/**
 * Created by Mika on 10/11/16.
 */
/**
 * Created by Mika on 7/25/2016.
 * /services and /services/* pages
 */
var express = require('express')
  , router = express.Router()

import {
  User
} from '../mongoose/model/comeet';
import {findMiddle} from '../functions/location'

router.all('/', function (req, res, next) { // Do something for all /location
  next();
});


router.post('/', function (req, res) {

  let userNameList = req.body.usersName.split(',');
  let lastNameList = userNameList.map((u)=>u.trim().split(' ')[1])
  console.log(lastNameList)

  checkToken(req.query.token, (err, user) => {
    if (err) {
      console.log(err);
      res.sendStatus(401);
      res.end();
      return;
    }
   User.find({lastName: {$in: lastNameList}}, (err, result) => {

      let location = [];
      result.forEach((r) => {
        location.push({latitude: r.homeLocation.latitude, longitude: r.homeLocation.longitude})
      });
     location.push({latitude: user.homeLocation.latitude, longitude: user.homeLocation.longitude})

     console.log(location)
      var test = findMiddle(location)
      console.log(err)
      res.send(test);
      res.end();


    });
  });
  // let eventId = findMiddle(req.body.eventName);
  // Event.findOne({_id:eventId})

  //res.send(result);

});

module.exports = router;
