const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user_id: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: { required: true, type: String, maxLength: 200 },
  description: { type: String, required: true, maxLength: 500 },
  likes: {
    type: Number,
    default: 0
  },
  comments: [Schema.Types.ObjectId],
  thread_id: {
    required: true,
    type:Schema.Types.ObjectId,
    ref: "Threads"
  } 
});

module.exports = mongoose.model('Post', PostSchema);
