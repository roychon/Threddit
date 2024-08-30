const { Router } = require("express")
const { authenticateToken } = require("../controllers/userController")
const postRouter = Router()
const Post = require("../model/Post")
const User = require("../model/User")

postRouter.post("/", authenticateToken, async (req, res) => {
    const { title, description, threadID } = req.body
    const { username } = req
    try {
        const user = await User.findOne({username})
        const post = await Post.create({title, description, user_id: user._id})
        return res.send("Post successfully created")
    } catch (e) {
        // console.log(e)
        return res.status(401).send("Error in post creation")
    }
})

module.exports = postRouter