const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comments: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
    default: []
  },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  commentValue: {
    required: true,
    type: String,
    maxLength: 500,
  },
});

module.exports = mongoose.model('Comments', CommentsSchema);
