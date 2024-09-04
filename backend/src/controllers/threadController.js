const Threads = require('../model/Threads');
const User = require('../model/User');
const Post = require('../model/Post');

const searchKeyword = async (req, res) => {
  const { keyword } = req.body;
  try {
    const threads = await Threads.find({
      title: { $regex: keyword, $options: 'i' },
      // the line above allows us to find any name containing keyword
    }).limit(5);
    res.json({ threads: threads });
  } catch {
    res.sendStaus(401);
  }
};

const createThread = async (req, res) => {
  const { title, description, userID } = req.body;
  // console.log(title, description, user_id)
  try {
    const thread = await Threads.create({
      title,
      description,
      user_id: userID,
    });
    const user = await User.findOne({ _id: userID });
    user.threads_created = [...user.threads_created, thread._id];
    thread.members = [...thread.members, user._id];
    await thread.save();
    await user.save();
    res.send('hello');
  } catch (e) {
    res.status(401).send('Error creating thread');
    console.log('Error: ', e);
  }
};

const joinThread = async (req, res) => {
  const { userID, threadID } = req.body;
  try {
    const thread = await Threads.findOne({ _id: threadID });
    if (!thread) res.status(404).send('Thread not found');
    const user = await User.findOne({ _id: userID });
    if (thread.members.includes(user._id))
      return res.status(401).send('User has already joined this thread');
    user.threads_joined = [...user.threads_joined, thread._id];
    thread.members = [...thread.members, user._id];
    await user.save();
    await thread.save();
    return res.send('User successfully joined thread');
  } catch (e) {
    res.status(401).send('Error joining thread');
  }
};

const getThreadName = async (req, res) => {
  const { threadID } = req.params;
  try {
    const thread = await Threads.findOne({ _id: threadID });
    return res.json({ threadName: thread.title });
  } catch (e) {
    return res.status(401).send('Error getting name of threadID');
  }
};

const getThreadPosts = async (req, res) => {
  const { threadID } = req.params;
  // console.log(threadID)
  try {
    const thread = await Threads.findOne({ _id: threadID });
    const threadCreator = await User.findOne({ _id: thread.user_id });
    const numMembers = thread.members.length;
    const numPosts = thread.posts.length;
    const threadPosts = await Post.find(
      { thread_id: threadID },
      'likes threadName title description user_id thread_id comments'
    )
      .populate('user_id', 'username')
      .sort({ likes: -1 })
      .limit(5);
    console.log(threadPosts);
    res.json({
      numMembers,
      numPosts,
      threadName: thread.title,
      threadID: thread._id,
      threadCreator,
      threadPosts,
    });
  } catch (e) {
    console.log('Error: ', e);
  }
};

module.exports = {
  searchKeyword,
  createThread,
  joinThread,
  getThreadName,
  getThreadPosts,
};
