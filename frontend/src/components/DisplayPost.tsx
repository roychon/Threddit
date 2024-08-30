import styles from '../styles/HomePage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface Comment {
  id: number;
  text: string;
  author: string;
}

interface DisplayPost {
  threadName: string;
  username: string;
  title: string;
  description: string;
  comments: Comment[];
  likes: number;
}

const DisplayPost = (props: DisplayPost) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/threads/${props.username}`);
  };

  return (
    <>
      <Link to={`/post/${props.username}`} className={styles.link}>
        <div className={styles.postContainer}>
          <div className={styles.topContainer}>
            <div className={styles.leftSection}>
              <FontAwesomeIcon icon={faHeart} className={styles.heart} />
              <p className={styles.likes}>{props.likes} likes</p>
            </div>
            <div className={styles.rightSection}>
              <div className={styles.rightTopContainer}>
                <div className={styles.threadName} onClick={handleClick}>
                  {props.threadName}
                </div>
                <div className={styles.circle}></div>
                <p>Posted by {props.username}</p>
              </div>
              <h1 className={styles.postTitle}>{props.title}</h1>
              <p>{props.description}</p>
            </div>
          </div>
          <div className={styles.bottomSection}>
            <FontAwesomeIcon icon={faComment} className={styles.comment} />
            <span>{props.comments.length} comments</span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default DisplayPost;
