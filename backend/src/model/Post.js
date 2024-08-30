const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user_id: Schema.Types.ObjectId,
  title: { required: true, type: String, maxLength: 200 },
  description: { type: String, required: true, maxLength: 500 },
  likes: Number,
  comments: [Schema.Types.ObjectId],
  thread_id: Schema.Types.ObjectId,
});

module.exports = mongoose.model('Post', PostSchema);
