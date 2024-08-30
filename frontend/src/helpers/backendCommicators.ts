import axios from "./axios"

// TODO: add backend logic of actually adding it to database
const createPost = async (title: String, description: String, threadID: String) => {
    try {
        console.log(title, description)
        await axios.post("/post", {
            title, description, threadID
        })
    } catch (e) {
        console.log("Error: ", e) // TODO: handle errors later
    }
}

const createThread = (title: String, description: String) => {
    console.log("create thread")
}

const checkAuthStatus = async () => {
    const status = await axios.get("/auth-status")
    return status
}

export {createPost, createThread, checkAuthStatus}