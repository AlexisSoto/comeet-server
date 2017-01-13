import TokenGenerator from 'uuid-token-generator';
import {User, TokenUser, Event} from '../mongoose/model/comeet';
import {findPlaceWithCoordinate, findMiddle} from './location';

export function createEvent(eventInfos, callback) {

  console.log(JSON.stringify(eventInfos));
  const middleCoordinate = findMiddle();
  findPlaceWithCoordinate(middleCoordinate, (err, placeRes)=> {
    if (err) {
      console.log(err);
      callback("place not found", null);
      return;
    }
    const currentEvent = new Event({ // create the user
      title: eventInfos.title,
      date: eventInfos.date,
      location: placeRes,
      guests: [],
      attendants: [eventInfos.creatorId],
      creator: eventInfos.creatorId
    });

    currentEvent.save((err, event)=> { // add it in bdd
      if (err) {
        console.log(err);
        callback("Event Not saved");
      } else {
        callback(null, event);
      }
    });
  })

}


export function updateEvent(userId, eventInfos, callback) {
  User.update({_id: userId}, {
    firstName: facebookInfos.first_name,
    lastName: facebookInfos.last_name,
    homeLocation: facebookInfos.location,
    gender: facebookInfos.gender,
    birthDay: facebookInfos.birthday,
    profilePictureUrl: facebookInfos.picture.data.url,
    email: facebookInfos.email
  }, {multi: false}, callback);

}
