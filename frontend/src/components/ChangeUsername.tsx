import { useState } from "react";

const ChangeUsername = () => {
    const [username, setUsername] = useState<String>("")
    return (
        <section className="white-div flexCol border-radius-10px" id="change-username">
            <div className="flexCol" style={{"gap": "15px"}}>
                <h2>Your username</h2>
                <p>Please enter a username you are comfortable with</p>
            </div>
            <div className="flexCol" style={{"gap": "15px"}}>
                <div className="flexRow border-radius-10px" id="change-username-input-wrapper">
                    <div style={{"width": "fitContent"}}>u/</div>
                    <input type="text" name="change-username-input" id="change-username-input" />
                </div>
                <button className="btn medium-btn border-radius-10px">Change username</button>
            </div>

        </section>
    );
}
 
export default ChangeUsername;