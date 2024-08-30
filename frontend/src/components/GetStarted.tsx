import { useNavigate } from "react-router-dom";

const GetStarted = () => {
    // const navigate = useNavigate()
    // TODO: make sure styling is inter font
    return (
        <section id="get-started">
            <div style={{"display": "flex", "flexDirection": "column", "gap": "24px"}}>
                <h3>Get started with Threddit,<br/> check in with your community</h3>
                <button onClick={() => console.log("Make this navigate to create thread page")} id="home-pg-create-thread-btn">Create Thread</button>
            </div>
        </section>
    );
}
 
export default GetStarted;