import { Link } from "react-router-dom";
import ChangeUsername from "../components/ChangeUsername";

const EditUser = () => {
    return (
        <section>
            <Link to="/">Back home</Link>
            <h2>Settings</h2>
            <ChangeUsername />
        </section>
    );
}
 
export default EditUser;