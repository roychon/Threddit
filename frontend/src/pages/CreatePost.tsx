import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import "../styles/post.css"
import axios from "../helpers/axios";
import { createPost } from "../helpers/backendCommicators";

const CreatePost = () => {
    const { threadID } = useParams();
    const [title, setTitle] = useState<String>("")
    const [description, setDescription] = useState<String>("")
    const [threadName, setThreadName] = useState<String>("")

    const handleClick = async () => {
        await createPost(title, description, threadID!)
        console.log("successfully created post")
    }

    useEffect(() => {
        const getThreadName = async () => {
            const data = await axios.get(`/thread/name/${threadID!}`)
            setThreadName(data.data.threadName)
            // console.log(data)
        }
        getThreadName()
    }, [])

    return (
        // TODO: fetch thread-name from url and output that in h3
        <section className="flexCol border-radius-10px" id="create-form">
            <h2 style={{"fontWeight": "bold"}}>{`Create Post in ${threadName}`}</h2>
            <div className="flexCol" id="create-form-inputs" style={{"gap": "30px"}}>
                <input onChange={(e) => setTitle(e.target.value)} type="text" id="create-form-title-input" placeholder="Title" />
                <textarea onChange={(e) => setDescription(e.target.value)} id="create-form-description-input" placeholder="description"></textarea>
            </div>
            <Button id="create-post-btn" handleClick={handleClick} text={"Create Post"} />
        </section>
    )
}
 
export default CreatePost;