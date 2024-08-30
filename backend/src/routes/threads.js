const { Router } = require('express');
const threadRouter = Router();
const ThreadController = require('../controllers/threadController');
const Thread = require("../model/Threads")
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

threadRouter.post('/search-bar', ThreadController.searchKeyword);


module.exports = threadRouter;
