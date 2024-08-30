const { Router } = require("express")
const userRouter = Router()
const User = require('../model/User')

// TODO: create user controller
userRouter.put("/username", async (req, res) => {
    const { newUsername, userID } = req.body
    await User.findOneAndUpdate({_id: userID}, {username: newUsername})
    res.send("username successfully updated")
})

module.exports = userRouter