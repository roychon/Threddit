import { useContext, useEffect, useState } from "react";
import { changeUsername } from "../helpers/backendCommicators";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const ChangeUsername = () => {
    const [username, setUsername] = useState<String>("")
    const [error, setError] = useState<Boolean>(false)
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        await changeUsername(username, auth?.user?._id)
        console.log("username successfully changed")
        navigate("/")
    }

    useEffect(() => {
        const usernameLen = username.length
        setError((usernameLen >= 1 && usernameLen < 3 ? true : false))
    }, [username])

    return (
        <section className="white-div flexCol border-radius-10px" id="change-username">
            <div className="flexCol" style={{"gap": "15px"}}>
                <h2>Your username</h2>
                <p>Please enter a username you are comfortable with</p>
            </div>
            <div className="flexCol" style={{"gap": "15px"}}>
                <div className="flexRow border-radius-10px" id="change-username-input-wrapper">
                    <div style={{"width": "fitContent"}}>u/</div>
                    <input onChange={(e) => handleChange(e)} type="text" name="change-username-input" id="change-username-input" />
                </div>
                <button className="btn medium-btn border-radius-10px" onClick={(e) => handleClick(e)}>Change username</button>
                <div style={{"height": "20px"}}>
                    {error && <p className="red">Username has to be at least 3 characters</p>}
                </div>

            </div>

        </section>
    );
}
 
export default ChangeUsername;