const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  commentValue: {
    required: true,
    type: String,
    maxLength: 500,
  },
});

module.exports = mongoose.model('Comments', CommentsSchema);
