const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThreadsSchema = new Schema({
  user_id: {
    required: true,
    type: Schema.Types.ObjectId
  },
  posts: [Schema.Types.ObjectId],
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  members: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Threads', ThreadsSchema);
