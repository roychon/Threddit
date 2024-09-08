import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { useContext, useState, useEffect } from 'react';
import {
  joinThread,
  leaveThread,
  checkMembership,
} from '../helpers/backendCommicators';

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
  const [isMember, setIsMember] = useState<boolean>(false);

  useEffect(() => {
    // Check if the user is a member of the thread when the component mounts
    const checkUserMembership = async () => {
      const memberStatus = await checkMembership(auth?.user?._id, threadID);
      setIsMember(memberStatus);
    };
    checkUserMembership();
  }, [auth?.user?._id, threadID]);

  const handleJoinOrLeave = async () => {
    if (isMember) {
      await leaveThread(auth?.user?._id, threadID);
      setIsMember(false);
    } else {
      await joinThread(auth?.user?._id, threadID);
      setIsMember(true);
    }
  };

  return (
    <section
      className={'white-div border-radius-10px flexCol'}
      id='about-thread-component'
    >
      <h1 style={{ fontWeight: 'bolder' }}>About {threadName}</h1>
      <div className='createdBy'>
        <p>Created by</p>
        <p>{threadCreator}</p>
      </div>
      <div className='members'>
        <p>Members:</p>
        <p>{numMembers.toString()}</p>
      </div>
      <div className='postsNum'>
        <p>Posts: </p>
        <p>{numPosts.toString()}</p>
      </div>
      <div className='flexCol' style={{ gap: '10px' }}>
        <button
          className='btn small-btn border-radius-10px'
          onClick={handleJoinOrLeave}
        >
          {isMember ? 'Leave Thread' : 'Join Thread'}
        </button>
        <button
          className='btn small-btn border-radius-10px createPost'
          onClick={() => navigate(`/post/${threadID}`)}
        >
          Create Post
        </button>
      </div>
    </section>
  );
};

export default AboutThread;
