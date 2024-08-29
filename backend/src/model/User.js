const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: [Schema.Types.ObjectId],
  comments: [Schema.Types.ObjectId],
  threads_joined: [Schema.Types.ObjectId],
  threads_created: [Schema.Types.ObjectId],
});

module.exports = mongoose.model('User', UserSchema);
