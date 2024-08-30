import AboutThread from "../components/AboutThread";
import CreateForm from "../components/CreateForm";
import "../styles/post.css"

const CreatePost = () => {
    return (
        <section className="flexRow" style={{"gap": "20px"}}>
            <CreateForm contentType="post" />
            <AboutThread />
        </section>
    )
}
export default CreatePost;