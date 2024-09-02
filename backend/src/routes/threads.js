const { Router } = require('express');
const threadRouter = Router();
const ThreadController = require('../controllers/threadController');
const Thread = require("../model/Threads")
const Post = require("../model/Post")
const User = require("../model/User");

// TODO: move this to ThreadController and also look at other files where you can move to controller
threadRouter.post('/', async (req, res) => {
    const { title, description, userID } = req.body
    // console.log(title, description, user_id)
    try {
        const thread = await Thread.create({title, description, "user_id": userID})
        const user = await User.findOne({_id: userID})
        user.threads_created = [...user.threads_created, thread._id]
        thread.members = [...thread.members, user._id]
        await thread.save()
        await user.save()
        res.send("hello")
    } catch (e) {
        res.status(401).send("Error creating thread")
        console.log("Error: ", e)
    }
})

threadRouter.post("/join", async (req, res) => {
    const { userID, threadID } = req.body
    try {
        const thread = await Thread.findOne({_id: threadID})
        if (!thread) res.status(404).send("Thread not found")
        const user = await User.findOne({_id: userID})
        if (thread.members.includes(user._id)) return res.status(401).send("User has already joined this thread")
        user.threads_joined = [...user.threads_joined, thread._id]
        thread.members = [...thread.members, user._id]
        await user.save();
        await thread.save();
        return res.send("User successfully joined thread")
    } catch (e) {
        res.status(401).send("Error joining thread")
    }
})

threadRouter.get("/name/:threadID", async (req, res) => {
    const { threadID } = req.params;
    try {
        const thread = await Thread.findOne({_id: threadID})
        return res.json({threadName: thread.title})
    } catch (e) {
        return res.status(401).send("Error getting name of threadID")
    }
})

// get posts related to threadID
threadRouter.get("/posts/:threadID", async (req, res) => {
    const { threadID } = req.params
    // console.log(threadID)
    try {
        const thread = await Thread.findOne({_id: threadID})
        const threadCreator = await User.findOne({_id: thread.user_id})
        const numMembers = thread.members.length
        const numPosts = thread.posts.length
        const threadPosts = await Post.find({thread_id: threadID}, 'likes threadName title description user_id thread_id comments').populate('user_id', 'username').sort({ likes: -1 }).limit(5)
        console.log(threadPosts)
        res.json({numMembers, numPosts, threadName: thread.title, threadID: thread._id, threadCreator, threadPosts})
    } catch (e) {
        console.log("Error: ", e)
    }
})

threadRouter.post('/search-bar', ThreadController.searchKeyword);


module.exports = threadRouter;
