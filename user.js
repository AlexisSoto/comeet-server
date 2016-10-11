import TokenGenerator from 'uuid-token-generator';
import {User, TokenUser} from './mongoose/model/comeet';

export function createUser(facebookInfos, facebookToken, callback) {

  const currentUser = new User({ // create the user
    fbId: facebookInfos.id,
    firstName: facebookInfos.first_name,
    lastName: facebookInfos.last_name,
    homeLocation: facebookInfos.location,
    gender: facebookInfos.gender,
    birthDay: facebookInfos.birthday,
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
  User.update({_id:userId}, { fbToken: facebookToken }, { multi: false }, callback);
}

export function generateToken(userId, callback) {
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

