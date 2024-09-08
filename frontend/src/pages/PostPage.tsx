import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../helpers/axios';
import DisplayPost from '../components/DisplayPost';
import { AuthContext } from '../context/AuthProvider';
import styles from '../styles/PostPage.module.css';
import LoadingSpinner from '../loader/Spinner';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faUpLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Comment {
  _id: string;
  user_id: {
    username: string;
  };
  commentValue: string;
}

interface Post {
  _id: string;
  title: string;
  description: string;
  comments: Comment[];
  likes: number;
  thread_id: {
    _id: string;
    title: string;
  };
  user_id: {
    username: string;
  };
}

const PostPage: React.FC = () => {
  const { postID } = useParams<{ postID: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const authContext = useContext(AuthContext);
  const userId = authContext?.user?._id;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`post/seepost/${postID}`);
        setPost(response.data.post);
        setLoading(false);
        console.log(response);
      } catch (error) {
        console.error('Error fetching post:', error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postID]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      console.error('User is not authenticated');
      return;
    }

    try {
      await axios.post(`/post/comments/${postID}`, {
        commentValue: comment,
        postID,
        userId,
      });
      setComment('');
      const response = await axios.get(`/post/seepost/${postID}`);
      setPost(response.data.post);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  // Display the loading spinner while data is being fetched
  if (loading)
    return (
      <div className={styles.loader}>
        <LoadingSpinner />
      </div>
    );

  // Display the post content when loading is complete
  if (!post) return <p>No post found.</p>;

  return (
    <div className='container'>
      <div className={styles.postPage}>
        <DisplayPost
          key={post._id}
          postId={post._id}
          description={post.description}
          title={post.title}
          comments={post.comments}
          likes={post.likes}
          threadName={'t/' + post.thread_id.title}
          username={post.user_id.username}
          thread_id={post.thread_id._id}
          className={styles.postContainer}
        />
        <div className={styles.commentSection}>
          <p className={styles.text}>Add Comment</p>
          <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
            <input
              type='text'
              value={comment}
              onChange={handleCommentChange}
              className={styles.commentInput}
            />
            <button type='submit' className={styles.commentButton}>
              Post
            </button>
          </form>
          {/* Display the comments */}
          <div className={styles.commentList}>
            {post.comments.map((comment) => (
              <div key={comment._id} className={styles.comment}>
                <p className={styles.commentBy}>u/{comment.user_id.username}</p>
                <p className={styles.commentValue}>{comment.commentValue}</p>
                <div className={styles.icons}>
                  <FontAwesomeIcon icon={faUpLong} className={styles.up} />
                  <p>{comment.likes.length ? comment.likes : 0}</p>
                  <FontAwesomeIcon icon={faUpLong} className={styles.down} />
                  <FontAwesomeIcon
                    icon={faComment}
                    className={styles.commentIcon}
                  />
                  <p className={styles.reply}>reply</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
