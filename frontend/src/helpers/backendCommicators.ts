import axios from "./axios"
// TODO: add backend logic of actually adding it to database
const createPost = async (title: String, description: String, threadID: String) => {
    try {
        await axios.post("/post", {
            title, description, threadID
        })
    } catch (e) {
        console.log("Error: ", e) // TODO: handle errors later
    }
}

const createThread = async (title: String, description: String, user_id: any) => {
    try {
        await axios.post("/thread", {
            title, description, user_id
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

export {createPost, createThread, checkAuthStatus}