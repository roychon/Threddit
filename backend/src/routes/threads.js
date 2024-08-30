const { Router } = require('express');
const threadRouter = Router();
const ThreadController = require('../controllers/threadController');
const Thread = require("../model/Threads")
const Post = require("../model/Post")
const User = require("../model/User")

// TODO: move this to ThreadController and also look at other files where you can move to controller
threadRouter.post('/', async (req, res) => {
    const { title, description, user_id } = req.body
    // console.log(title, description, user_id)
    try {
        const thread = await Thread.create({title, description, user_id})
        res.send("hello")
    } catch (e) {
        console.log("Error: ", e)
    }
})

threadRouter.get("/posts/:threadID", async (req, res) => {
    const { threadID } = req.params
    try {
        const thread = await Thread.findOne({_id: threadID})
        const threadCreator = await User.findOne({_id: thread.user_id})
        const numMembers = thread.members
        const numPosts = thread.posts.length
        const threadPosts = await Post.find({thread_id: threadID}).limit(7)
        console.log(threadPosts)
        res.json({numMembers, numPosts, threadPosts, threadCreator})
    } catch (e) {
        console.log("Error: ", e)
    }

})

threadRouter.post('/search-bar', ThreadController.searchKeyword);


module.exports = threadRouter;
