import axios from "./axios"

const createPost = async (title: String, description: String, threadID: String) => {
    try {
        await axios.post("/post", {
            title, description, threadID
        })
    } catch (e) {
        console.log("Error: ", e) // TODO: handle errors later
    }
}

const createThread = async (title: String, description: String, userID: any) => {
    try {
        await axios.post("/thread", {
            title, description, userID
        })
        console.log("thread created")
    } catch (e) {
        console.log("Error: ", e)
    }
}

const checkAuthStatus = async () => {
    const status = await axios.get("/auth-status")
    return status
}

const changeUsername = async (newUsername: String, userID: any) => {
    try {
        const status = await axios.put("/user/username", {
            newUsername, userID
        })
        return status
    } catch (e) {
        console.log("Error: ", e)
    }
}

const joinThread = async (userID: any, threadID: any) => {
    try {
        const data = await axios.post("/thread/join", {
            userID, threadID
        })
        console.log(data)
    } catch (e) {
        console.log("Error: ", e)
    }
}

export {createPost, createThread, checkAuthStatus, changeUsername, joinThread}