import { useContext, useState } from "react";
import Button from "./Button";
import {createPost, createThread} from "../helpers/backendCommicators";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const CreateForm = ({contentType}: {contentType: String}) => {
    const params = useParams()
    const buttonTitle = contentType == "post" ? "Create Post" : "Create Thread"
    const auth = useContext(AuthContext)
    const handleClick = async () => {
        await (contentType == "post" ? createPost(title, description, "10") : createThread(title, description, auth!.user!._id))
        // useNavigate() hook
    }
    const [title, setTitle] = useState<String>("")
    const [description, setDescription] = useState<String>("")
    return (
        // TODO: fetch thread-name from url and output that in h3
        <section className="flexCol border-radius-10px" id="create-form">
            <h2 style={{"fontWeight": "bold"}}>{contentType == "post" ? "Create Post in ${thread-name}" : "Create thread"}</h2>
            <div className="flexCol" id="create-form-inputs" style={{"gap": "30px"}}>
                <input onChange={(e) => setTitle(e.target.value)} type="text" id="create-form-title-input" placeholder="Title" />
                <textarea onChange={(e) => setDescription(e.target.value)} id="create-form-description-input" placeholder="description"></textarea>
            </div>
            <Button id="create-post-btn" handleClick={handleClick} text={buttonTitle} />
        </section>
    )
}

export default CreateForm;