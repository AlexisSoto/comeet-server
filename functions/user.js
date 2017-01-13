import TokenGenerator from 'uuid-token-generator';
import {User, TokenUser} from '../mongoose/model/comeet';

export function createUser(facebookInfos, facebookToken, callback) {

//  console.log(JSON.stringify(facebookInfos))
  const currentUser = new User({ // create the user
    fbId: facebookInfos.id,
    firstName: facebookInfos.first_name,
    lastName: facebookInfos.last_name,
    homeLocation: facebookInfos.location,
    gender: facebookInfos.gender,
    birthDay: facebookInfos.birthday,
    profilePictureUrl: facebookInfos.picture.data.url,
    email: facebookInfos.email,
    fbToken: facebookToken
  });

  currentUser.save((err, user)=> { // add it in bdd
    if (err) {
      console.log(err);
      callback("User Not saved", user._id);
    } else {
      callback(null, user._id);
    }
  });
}

export function updateFbToken(userId, facebookToken, callback) {
  User.update({_id: userId}, {fbToken: facebookToken}, {multi: false}, callback);
}


export function updateUserInfos(userId, facebookInfos, callback) {
  console.log(JSON.stringify(facebookInfos));
  console.log(JSON.stringify(facebookInfos.friends));

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

export function checkToken(token, callback) { // Need to be in redis

  TokenUser.findOne({token: token}).populate('user')
    .exec((err, result)=> { // search if token is already un bdd
        if (err) {
          console.log(token + 'err find TokenUser' + err);

          res.sendStatus(500);
          res.end();
          return;
        }
        if (!result) {

          console.log('false token');
          callback(token +' wrong token '+ result);
        }
        else {
          callback(null, result.user);

        }
      }
    )
}

export function generateToken(userId, callback) {  // Need to be in redis
  if (!userId) {
    throw "No userId " + userId;

  }

  const tokgen = new TokenGenerator(1024, TokenGenerator.BASE62);
  const token = new TokenUser({
    token: tokgen.generate(),
    user: userId
  })
  token.save((err, result)=> {
    if (err) {
      console.log(err);
      callback(err);
      return;
      throw "Token Not saved";
    }
    else {
      callback(null, result.token);

    }
  });
}


export function getUserFromEmail(email, callback) {  // Need to be in redis
  if (!email) {
    throw "No userId " + userId;

  }

  User.findOne({email}, (err, user)=> {
    if (err) {
      console.log(err);
      callback(err);
      return;
    }
    else {
      callback(null, user);

    }
  });
}

