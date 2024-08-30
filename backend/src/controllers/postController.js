const Post = require('../model/Post');

const createPost = async (req, res) => {
  const { title, description, threadID } = req.body;
  const { username } = req;
  try {
    const user = await User.findOne({ username });
    const post = await Post.create({ title, description, user_id: user._id });
    return res.send('Post successfully created');
  } catch (e) {
    // console.log(e)
    return res.status(401).send('Error in post creation');
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ likes: -1 }).limit(5);
    return res.json({ posts: posts });
  } catch {
    res.sendStatus(409);
  }
};
module.exports = { createPost, getPosts };
