// CommentForm.tsx
import React from 'react';
import styles from '../styles/PostPage.module.css';

interface CommentFormProps {
  comment: string;
  onCommentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCommentSubmit: (e: React.FormEvent) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  comment,
  onCommentChange,
  onCommentSubmit,
}) => {
  return (
    <form onSubmit={onCommentSubmit} className={styles.commentForm}>
      <input
        type='text'
        value={comment}
        onChange={onCommentChange}
        className={styles.commentInput}
      />
      <button type='submit' className={styles.commentButton}>
        Post
      </button>
    </form>
  );
};

export default CommentForm;
