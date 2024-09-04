import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { useContext } from 'react';
import { joinThread } from '../helpers/backendCommicators';

interface ThreadProps {
  threadCreator: string;
  numMembers: Number;
  numPosts: Number;
  threadName: string;
  threadID: string;
}

const AboutThread = ({
  threadCreator,
  numMembers,
  numPosts,
  threadName,
  threadID,
}: ThreadProps) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  return (
    <section
      className='white-div border-radius-10px flexCol'
      id='about-thread-component'
    >
      <h1 style={{ fontWeight: 'bolder' }}>About {threadName}</h1>
      <p>Created by {threadCreator}</p>
      <p>Members: {numMembers.toString()}</p>
      <p>Posts: {numPosts.toString()}</p>
      <div className='flexRow' style={{ gap: '10px' }}>
        <button
          className='btn small-btn border-radius-10px'
          onClick={() => navigate(`/post/${threadID}`)}
        >
          Create Post
        </button>
        <button
          className='btn small-btn border-radius-10px'
          onClick={() => joinThread(auth?.user?._id, threadID)}
        >
          Join Thread
        </button>
      </div>
    </section>
  );
};

export default AboutThread;
