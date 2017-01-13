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
import {
  createEvent
} from '../functions/events';

var express = require('express'),
  router = express.Router()

import {
  Event
} from '../mongoose/model/comeet';
router.all('/', function (req, res, next) { // Do something for all /event
  next();
});

router.get('/', function (req, res) {

  checkToken(req.query.token, (err, user) => {
    if (err) {
      console.log(err)
      res.sendStatus(401);
      res.end();
    } else {
      Event.find({
        creator: user._id
      }, (err, result) => { // need to check if user is in this event
        if (err) {
          res.sendStatus(500);
          res.end();
          return;
        }
        res.send(result);
        res.end();
        return;
      })

    }
  });

});

router.post('/', function (req, res) {
  let eventInfos = {};
  eventInfos.title = req.body.title;
  eventInfos.date = new Date(req.body.date);

  checkToken(req.query.token, (err, user) => {
    if (err) {
      res.sendStatus(401);
      res.end();
    } else {

      eventInfos.creatorId = user._id; // get Id from token

      createEvent(eventInfos, (err, result) => {

        if (err) {
          res.sendStatus(500);
          res.end();
        } else {
          res.send(result);
          res.end();
        }
      });
    }
  });
});

router.put('/:id', function (req, res) {
  const id = req.params.id;
  const eventInfos = req.body;

  if (!id || !eventInfos) {
    res.sendStatus(400);
    res.end();
    return;
  }
  checkToken(req.query.token, (err, user) => {
    if (err) {
      res.sendStatus(401);
      res.end();
    } else {

      Event.find({
        _id: id
      }, (err, result) => { // need to check if user is in this event
        if (err) {
          res.sendStatus(404);
          res.end();
          return;
        }
        console.log('updating with : '+ JSON.stringify(eventInfos))
        let test = Event.findOneAndUpdate({
          _id: id
        },{$set: eventInfos},{new: true},(err,result)=>{
          if(err)
          console.log(err)
          res.send(result);
        res.end();
        return;
        })
        //console.log(test)
        
      })
    }
  });
});

router.get('/:id', function (req, res) {
  var id = req.params.id;
  if (!id) {
    res.sendStatus(400);
    res.end();
    return;
  }
  Event.find({
    _id: id
  }, (err, result) => { // need to check if user is in this event
    if (err) {
      res.sendStatus(404);
      res.end();
      return;
    }
    res.send(result);
    res.end();
    return;
  })


});

/*
 // More or less as same as post
 router.update('/:id', function (req, res) {
 var id = req.params.id;
 if (!id) {
 res.sendStatus(404);
 res.end();
 return;
 }


 });

 router.delete('/:id', function (req, res) {
 var id = req.params.id;
 if (!id) {
 res.sendStatus(404);
 res.end();
 return;
 }


 });
 */
module.exports = router