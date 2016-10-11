/**
 * Created by Mika on 10/10/16.
 */
import mongoose from 'mongoose';
let Schema = mongoose.Schema;


const tokenUserSchema = new Schema({
  user: {type: Schema.ObjectId, ref: 'User'},
  token: String,
  generationDate: { type: Date, default: Date.now },
  lastUsed : { type: Date, default: Date.now }

});


const userSchema = new Schema({
  fbId: Number,
  firstName: String,
  lastName: String,
  fbToken: String,
  homeLocation: {
    latitude: Number,
    longitude: Number,
    altitude: Number
  },
  gender: String,
  profilePic: String,
  birthday: Date,
  email: String,
  createdDate: Date
});


const eventSchema = new Schema({
  title: String,
  date: Date,
  location: {
    coordinate: {
      latitude: Number,
      longitude: Number,
      altitude: Number
    },
    name: String,
    googlePlaceId: String
  },
  guests: [{type: Schema.ObjectId, ref: 'User'}],
  attendants: [{type: Schema.ObjectId, ref: 'User'}],
  creator: {type: Schema.ObjectId, ref: 'User'}

});

module.exports = {
  userSchema,
  eventSchema,
  tokenUserSchema,
};