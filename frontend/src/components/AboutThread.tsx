const AboutThread = () => {
    return (
        <section className="white-div border-radius-10px flexCol" id="about-thread-component">
            <h3>About $thread-name</h3>
            <p>Created by $user-name</p>
            <p>Members: $num-members</p>
            <p>Posts: $num-posts</p>
            <div className="flexRow" style={{"gap": "10px"}}>
                <button className="btn small-btn border-radius-10px">View Thread</button>
                <button className="btn small-btn border-radius-10px">Join Thread</button>
            </div>
        </section>
    );
}
 
export default AboutThread;