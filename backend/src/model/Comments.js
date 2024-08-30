const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  user_id: Schema.Types.ObjectId,
  comments: [Schema.Types.ObjectId],
  likes: Number,
  commentValue: {
    required: true,
    type: String,
    maxLength: 500,
  },
});

module.exports = mongoose.model('Comments', CommentsSchema);
