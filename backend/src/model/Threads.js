const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThreadsSchema = new Schema({
  user_id: Schema.Types.ObjectId,
  posts: [Schema.Types.ObjectId],
  name: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('Threads', ThreadsSchema);
