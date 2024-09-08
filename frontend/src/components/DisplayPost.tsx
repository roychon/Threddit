import styles from '../styles/HomePage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faUpLong } from '@fortawesome/free-solid-svg-icons';
import axios from '../helpers/axios';

// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';

interface Comment {
  id: number;
  text: string;
  author: string;
}

interface DisplayPost {
  className: string;
  threadName: string;
  username: string;
  title: string;
  description: string;
  comments: Comment[];
  likes: number;
  thread_id: any;
  postId: any;
}

const DisplayPost = (props: DisplayPost) => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState<number>(props.likes);
  const [userVote, setUserVote] = useState<'none' | 'up' | 'down'>('none');
  const authContext = useContext(AuthContext);
  const userId = authContext?.user?._id;

  // Handle the upvote action
  const handleVote = async (voteType: 'up' | 'down') => {
    if (!userId) {
      alert('You need to be logged in to vote!');
      return;
    }

    if (userVote === voteType) {
      alert(`You have already ${voteType}voted this post`);
      return;
    }

    try {
      const response = await axios.post(`/post/likes/${props.postId}`, {
        user_id: userId,
        voteType: voteType,
      });
      console.log(response);
      setLikes(response.data.likes);
      setUserVote(voteType);
    } catch (error) {
      console.error('Failed to vote:', error.response.data.error);
      alert(error.response.data.error);
    }
  };

  const handleUpvote = () => handleVote('up');
  const handleDownvote = () => handleVote('down');

  const handleClick = () => {
    navigate(`/thread/${props.thread_id}`);
  };

  return (
    <>
      {/* <Link to={`/post/${props.username}`} className={styles.link}> */}
      <div className={props.className}>
        <div className={styles.topContainer}>
          <div className={styles.leftSection}>
            <FontAwesomeIcon
              icon={faUpLong}
              className={styles.up}
              onClick={handleUpvote}
            />
            <p className={styles.likes}>{likes}</p>
            <FontAwesomeIcon
              icon={faUpLong}
              className={styles.down}
              onClick={handleDownvote}
            />
          </div>
          <div className={styles.rightSection}>
            <div className={styles.rightTopContainer}>
              <div className={styles.threadName} onClick={handleClick}>
                {props.threadName}
              </div>
              <div className={styles.circle}></div>
              <p className={styles.postedBy}>Posted by {props.username}</p>
            </div>
            <h1
              className={styles.postTitle}
              onClick={() => navigate(`/post/${props.username}`)}
            >
              {props.title}
            </h1>
            <p className={styles.description}>{props.description}</p>
          </div>
        </div>
        <div className={styles.bottomSection}>
          <FontAwesomeIcon icon={faComment} className={styles.comment} />
          <span>{props.comments.length} comments</span>
        </div>
      </div>
      {/* </Link> */}
    </>
  );
};

export default DisplayPost;
