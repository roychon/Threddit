const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  user_id: Schema.Types.ObjectId,
  comments: [Schema.Types.ObjectId],
  likes: [Schema.Tyoes.ObjectId], // so that user cannot infinitely like as many posts as they want
  commentValue: {
    required: true,
    type: String,
    maxLength: 500,
  },
});

module.exports = mongoose.model('Comments', CommentsSchema);
