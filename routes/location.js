/**
 * Created by Mika on 10/11/16.
 */
/**
 * Created by Mika on 7/25/2016.
 * /services and /services/* pages
 */
var express = require('express')
  , router = express.Router()
import {findMiddle} from '../functions/location'

router.all('/', function (req, res, next) { // Do something for all /location
  next();
});


router.post('/', function (req, res) {


  let result = findMiddle(req.body.locations);

  res.send(result);
  res.end();

});

module.exports = router;
