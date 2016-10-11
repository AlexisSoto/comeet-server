/**
 * Created by Mika on 10/10/16.
 */
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

import {userSchema, eventSchema,tokenUserSchema} from '../schema/comeet'


const User = mongoose.model('User', userSchema);

const Event = mongoose.model('Event', eventSchema);
const TokenUser = mongoose.model('tokenUser', tokenUserSchema);

module.exports = {
  Event,
  User,
  TokenUser
};