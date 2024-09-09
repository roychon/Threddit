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
import CommentForm from '../components/CommentForm';

interface Comment {
  likes: React.ReactNode;
  _id: string;
  user_id: {
    gradient: string | undefined;
    username: string;
  };
  commentValue: string;
  replies: [Comment]
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
  const [loading, setLoading] = useState(true);
  const [replyForms, setReplyForms] = useState<Record<string, string>>({}); // Separate state for each reply form
  const [visibleReplyForm, setVisibleReplyForm] = useState<string | null>(null); // Track visibility
  const authContext = useContext(AuthContext);
  const userId = authContext?.user?._id;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`post/seepost/${postID}`);
        setPost(response.data.post);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postID]);

  const handleCommentChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    commentId: string
  ) => {
    setReplyForms((prev) => ({ ...prev, [commentId]: e.target.value }));
  };

  const handleCommentSubmit = async (e: React.FormEvent, parentId: string) => {
    e.preventDefault();

    if (!userId) {
      console.error('User is not authenticated');
      return;
    }

    try {
      await axios.post(`/post/comments/${postID}`, {
        commentValue: replyForms[parentId],
        postID,
        userId,
        parentId,
      });
      setReplyForms((prev) => ({ ...prev, [parentId]: '' })); // Clear the reply form input
      setVisibleReplyForm(null); // Hide the reply form after submission
      const response = await axios.get(`/post/seepost/${postID}`);
      setPost(response.data.post);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleSubCommentSubmit = async (e: React.FormEvent<Element>, parentId: string) => {
    e.preventDefault()
    const commentValue = replyForms[parentId]
    const data = await axios.post(`/comment/subcomment/${parentId}`, {
      commentValue, "userId": authContext?.user?._id
    })
    console.log(data)

  }

  const toggleReplyForm = (commentId: string) => {
    setVisibleReplyForm((prev) => (prev === commentId ? null : commentId));
  };

  if (loading)
    return (
      <div className={styles.loader}>
        <LoadingSpinner />
      </div>
    );

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
          <CommentForm
            comment={replyForms['']} // Use empty string for top-level comment form
            onCommentChange={(e) => handleCommentChange(e, '')}
            onCommentSubmit={(e) => handleCommentSubmit(e, '')}
          />
          {/* Display the comments */}
          <div className={styles.commentList}>
            {post.comments.map((comment) => (
              <div key={comment._id} className={styles.comment}>
                <div className={styles.topLeft}>
                  <div
                    className={styles.circle}
                    style={{
                      background: comment.user_id.gradient
                        ? comment.user_id.gradient
                        : 'white',
                    }}
                  ></div>
                  <p className={styles.commentBy}>
                    u/{comment.user_id.username}
                  </p>
                </div>
                <p className={styles.commentValue}>{comment.commentValue}</p>
                <div className={styles.icons}>
                  <FontAwesomeIcon icon={faUpLong} className={styles.up} />
                  <p>{comment.likes.length ? comment.likes : 0}</p>
                  <FontAwesomeIcon icon={faUpLong} className={styles.down} />
                  <FontAwesomeIcon
                    icon={faComment}
                    className={styles.commentIcon}
                    onClick={() => toggleReplyForm(comment._id)}
                  />
                  <p className={styles.reply}>reply</p>
                </div>
                {visibleReplyForm === comment._id && (
                  <div className={styles.replyFormContainer}>
                    <CommentForm
                      comment={replyForms[comment._id] || ''} // Default to empty string if no reply
                      onCommentChange={(e) =>
                        handleCommentChange(e, comment._id)
                      }
                      onCommentSubmit={(e) => {
                        handleSubCommentSubmit(e, comment._id)
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
