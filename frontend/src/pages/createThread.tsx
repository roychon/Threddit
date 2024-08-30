import { Link } from "react-router-dom";
import CreateForm from "../components/CreateForm";

const createThread = () => {
    return (
        <>
            <Link to="/">Back home</Link>
            <CreateForm contentType="thread" />
        </>
    );
}
 
export default createThread;