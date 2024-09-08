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

const leaveThread = async (req, res) => {
  const { userID, threadID } = req.body;
  try {
    const thread = await Threads.findOne({ _id: threadID });
    if (!thread) return res.status(404).send('Thread not found');

    const user = await User.findOne({ _id: userID });
    if (!user) return res.status(404).send('User not found');

    if (!thread.members.includes(user._id))
      return res.status(401).send('User is not a member of this thread');

    // Remove user from the thread
    thread.members = thread.members.filter(
      (member) => member.toString() !== user._id.toString()
    );
    // Remove thread from the user
    user.threads_joined = user.threads_joined.filter(
      (thread) => thread.toString() !== threadID.toString()
    );

    await user.save();
    await thread.save();

    return res.send('User successfully left thread');
  } catch (e) {
    console.error(e);
    return res.status(500).send('Error leaving thread');
  }
};

const checkMembership = async (req, res) => {
  const { userID, threadID } = req.query;
  try {
    const thread = await Threads.findOne({ _id: threadID });
    if (!thread) return res.status(404).send('Thread not found');

    const user = await User.findOne({ _id: userID });
    if (!user) return res.status(404).send('User not found');

    // Check if the user is a member of the thread
    const isMember = thread.members.includes(user._id);

    return res.json({ isMember });
  } catch (e) {
    console.error(e);
    return res.status(500).send('Error checking membership');
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
  const { page = 1, limit = 5 } = req.query; // Get page and limit from query parameters
  const skip = (parseInt(page) - 1) * parseInt(limit); // Calculate how many posts to skip

  try {
    const thread = await Threads.findOne({ _id: threadID });
    const threadCreator = await User.findOne({ _id: thread.user_id });
    const numMembers = thread.members.length;
    const numPosts = thread.posts.length;

    const threadPosts = await Post.find({ thread_id: threadID })
      .populate('thread_id user_id')
      .sort({ likes: -1 })
      .skip(skip) // Skip the number of posts based on the current page
      .limit(parseInt(limit)); // Limit the number of posts returned

    console.log(threadPosts);

    res.json({
      numMembers,
      numPosts,
      threadName: thread.title,
      threadID: thread._id,
      threadCreator,
      threadPosts,
      hasMore: numPosts > skip + threadPosts.length, // Determine if there are more posts
    });
  } catch (e) {
    console.log('Error: ', e);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  searchKeyword,
  createThread,
  joinThread,
  leaveThread,
  checkMembership,
  getThreadName,
  getThreadPosts,
};
