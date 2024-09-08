const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user_id: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: { required: true, type: String, maxLength: 200 },
  description: { type: String, required: true, maxLength: 500 },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }],
  thread_id: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Threads',
  },
  votes: [
    {
      user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      voteType: {
        type: String, // "up" for upvote, "down" for downvote
        enum: ['up', 'down'],
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Post', PostSchema);
