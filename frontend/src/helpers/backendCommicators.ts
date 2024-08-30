import axios from "./axios"

// TODO: add backend logic of actually adding it to database
const createPost = async (title: String, description: String) => {
    try {
        console.log(title, description)
        const data = await axios.post("/createPost", {
            title, description
        })
        return data
    } catch (e) {
        console.log("Error: ", e) // TODO: handle errors later
    }
}

const createThread = (title: String, description: String) => {
    console.log("create thread")
}

export {createPost, createThread}