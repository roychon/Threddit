import React from 'react';
import Nav from '../components/Nav';
import DisplayPost from '../components/DisplayPost';
import styles from '../styles/HomePage.module.css';
import GetStarted from '../components/GetStarted';
import useInfiniteScrollPosts from '../hooks/usePostInfiniteScroll';
import LoadingSpinner from '../loader/Spinner';

const HomePage: React.FC = () => {
  const { posts, lastPostRef, loading } = useInfiniteScrollPosts(1, '/post');

  return (
    <>
      {/* <Nav /> */}
      <div className={styles.homePageContainer}>
        <div className='posts'>
          <h1 className={styles.yourFeed}>Your Feed</h1>
          {posts.map((post, index) => {
            if (index === posts.length - 1) {
              return (
                <div ref={lastPostRef} key={post._id}>
                  <DisplayPost
                    postId={post._id}
                    description={post.description}
                    title={post.title}
                    comments={post.comments}
                    likes={post.likes}
                    threadName={'t/' + post.thread_id.title}
                    username={post.user_id.username}
                    thread_id={post.thread_id._id}
                    className={styles.postContainer}
                    gradient={post.user_id.gradient}
                  />
                </div>
              );
            } else {
              return (
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
                  gradient={post.user_id.gradient}
                />
              );
            }
          })}
          {/* Display the loading spinner while posts are being fetched */}
          <div className={styles.loader}>{loading && <LoadingSpinner />}</div>
        </div>
        <GetStarted />
      </div>
    </>
  );
};

export default HomePage;
