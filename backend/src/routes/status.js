const { Router } = require("express")
const statusRouter = Router()
const { verifyUser, authenticateToken } = require("../controllers/userController")

statusRouter.get("/", authenticateToken, verifyUser)

module.exports = statusRouter