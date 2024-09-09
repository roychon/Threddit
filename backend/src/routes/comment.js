const { Router } = require('express');
const commentRouter = Router();
const Comments = require('../model/Comments')
const User = require("../model/User")
// const UserController = require('../controllers/userController');

// TODO: create Comment controller
commentRouter.post('/subcomment/:parentId', async (req, res) => {
    const { commentValue, userId } = req.body
    const { parentId } = req.params
    const subComment = await Comments.create({commentValue, user_id: userId}) // the 'reply' comment
    console.log("sub comment: ", subComment)
    const user = await User.findOne({_id: userId})
    user.comments = user.comments ? [...user.comments, subComment._id] : [subComment._id]
    await user.save()
    const comment = await Comments.findOne({_id: parentId}) // comment that is being commented on
    comment.comments = [...comment.comments, subComment._id]
    await comment.save()
    return res.json(comment)
});

module.exports = commentRouter;
