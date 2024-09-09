const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: [Schema.Types.ObjectId],
  comments: {
    type: [Schema.Types.ObjectId],
    default: []
  } ,
  threads_joined: [Schema.Types.ObjectId],
  threads_created: [Schema.Types.ObjectId],
  gradient: { type: String, unique: true },
});

module.exports = mongoose.model('User', UserSchema);
