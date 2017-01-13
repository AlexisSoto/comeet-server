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

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

router.post('/', function (req, res) {


  const latitude =  req.body.latitude?parseFloat(req.body.latitude):0;
  const longitude =  req.body.longitude?parseFloat(req.body.longitude):0;

  const result = [{
    name: 'coucou',
    location: {latitude: latitude, longitude: longitude},
    imgUrl:'http://24.media.tumblr.com/tumblr_m3o66hm6Pz1rtuomto1_500.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra risus nunc, vel iaculis diam tempus ut. Vivamus condimentum dapibus lorem. In rutrum lorem eget lacus bibendum, et accumsan nulla facilisis. Maecenas sit amet lectus posuere, consectetur quam eget, fringilla ipsum. Etiam auctor vestibulum dolor nec elementum. In vitae augue ex. Praesent at congue turpis. Mauris elementum sapien vitae euismod lobortis. Quisque tempus bibendum orci, vel ultricies massa pretium ac. Nulla tempor ac erat et sodales. Duis ac scelerisque dolor. Proin sit amet lacus viverra, porta massa sit amet, pharetra nisi. Praesent at maximus lorem, non ultrices erat. Integer sagittis eleifend elit a finibus.'
  },
    {
      name: 'Bar 1',
      location: {latitude: latitude+3, longitude: longitude+2.4},
      imgUrl:'http://thecatapi.com/api/images/get?format=src&type=png',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra risus nunc, vel iaculis diam tempus ut. Vivamus condimentum dapibus lorem. In rutrum lorem eget lacus bibendum, et accumsan nulla facilisis. Maecenas sit amet lectus posuere, consectetur quam eget, fringilla ipsum. Etiam auctor vestibulum dolor nec elementum. In vitae augue ex. Praesent at congue turpis. Mauris elementum sapien vitae euismod lobortis. Quisque tempus bibendum orci, vel ultricies massa pretium ac. Nulla tempor ac erat et sodales. Duis ac scelerisque dolor. Proin sit amet lacus viverra, porta massa sit amet, pharetra nisi. Praesent at maximus lorem, non ultrices erat. Integer sagittis eleifend elit a finibus.'
    },
    {
      name: 'Bar 2',
      location: {latitude: latitude-3, longitude: longitude+2.1},
      imgUrl:'http://28.media.tumblr.com/tumblr_lt34vpv28X1qbt33io1_500.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra risus nunc, vel iaculis diam tempus ut. Vivamus condimentum dapibus lorem. In rutrum lorem eget lacus bibendum, et accumsan nulla facilisis. Maecenas sit amet lectus posuere, consectetur quam eget, fringilla ipsum. Etiam auctor vestibulum dolor nec elementum. In vitae augue ex. Praesent at congue turpis. Mauris elementum sapien vitae euismod lobortis. Quisque tempus bibendum orci, vel ultricies massa pretium ac. Nulla tempor ac erat et sodales. Duis ac scelerisque dolor. Proin sit amet lacus viverra, porta massa sit amet, pharetra nisi. Praesent at maximus lorem, non ultrices erat. Integer sagittis eleifend elit a finibus.'
    },
    {
      name: 'Bar 3',
      location: {latitude: latitude+1.1, longitude: longitude+0.4},
      imgUrl:'http://24.media.tumblr.com/tumblr_m0xhvrwJsA1r6b7kmo1_1280.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra risus nunc, vel iaculis diam tempus ut. Vivamus condimentum dapibus lorem. In rutrum lorem eget lacus bibendum, et accumsan nulla facilisis. Maecenas sit amet lectus posuere, consectetur quam eget, fringilla ipsum. Etiam auctor vestibulum dolor nec elementum. In vitae augue ex. Praesent at congue turpis. Mauris elementum sapien vitae euismod lobortis. Quisque tempus bibendum orci, vel ultricies massa pretium ac. Nulla tempor ac erat et sodales. Duis ac scelerisque dolor. Proin sit amet lacus viverra, porta massa sit amet, pharetra nisi. Praesent at maximus lorem, non ultrices erat. Integer sagittis eleifend elit a finibus.'
    }]
  res.json(shuffle(result));
  res.end();

});

module.exports = router;
