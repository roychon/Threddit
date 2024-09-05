const Post = require('../model/Post');
const User = require('../model/User');
const Threads = require('../model/Threads');

const createPost = async (req, res) => {
  const { title, description, threadID } = req.body;
  const { username } = req;
  try {
    const user = await User.findOne({ username });
    const post = await Post.create({
      title,
      description,
      user_id: user._id,
      thread_id: threadID,
    });
    const thread = await Threads.findOne({ _id: threadID });
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
    // Extract pagination parameters from query parameters
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 5; // Default to 5 posts per page

    // Calculate the number of posts to skip
    const skip = (page - 1) * limit;

    // Fetch posts with sorting, populating, limiting, and skipping
    const posts = await Post.find()
      .sort({ likes: -1 })
      .populate('thread_id user_id')
      .skip(skip) // Skip posts based on pagination
      .limit(limit); // Limit the number of posts

    // Send the posts in the response
    return res.json({ posts: posts });
  } catch (error) {
    console.error(error);
    res.sendStatus(409);
  }
};

const getKeywordPosts = async (req, res) => {
  const { keyword } = req.body;
  try {
    const posts = await Post.find({
      title: { $regex: keyword, $options: 'i' },
    }).limit(5);
    res.json({ posts: posts });
  } catch {
    res.sendStaus(401);
  }
};

module.exports = { createPost, getPosts, getKeywordPosts };
