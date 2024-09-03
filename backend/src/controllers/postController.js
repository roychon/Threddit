const Post = require('../model/Post');
const User = require('../model/User');
const Threads = require('../model/Threads')

const createPost = async (req, res) => {
  const { title, description, threadID } = req.body;
  const { username } = req;
  try {
    const user = await User.findOne({ username });
    const post = await Post.create({ title, description, user_id: user._id, thread_id: threadID });
    const thread = await Threads.findOne({_id: threadID});
    thread.posts = [...thread.posts, post._id];
    user.posts = [...user.posts, post._id];
    await thread.save();
    await user.save();
    return res.send('Post successfully created');
  } catch (e) {
    // console.log(e)
    return res.status(401).send('Error in post creation');
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ likes: -1 }).populate("thread_id user_id").limit(5);
    return res.json({ posts: posts });
  } catch {
    res.sendStatus(409);
  }
};
module.exports = { createPost, getPosts };
