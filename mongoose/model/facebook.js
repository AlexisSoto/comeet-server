/**
 * Created by Mika on 10/10/16.
 */
import mongoose from 'mongoose';

var Like = mongoose.model('Like', { name: String, id: Number, created_time:String });
