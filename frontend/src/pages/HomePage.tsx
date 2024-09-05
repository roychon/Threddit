import React from 'react';
import Nav from '../components/Nav';
import DisplayPost from '../components/DisplayPost';
import styles from '../styles/HomePage.module.css';
import GetStarted from '../components/GetStarted';
import useInfiniteScrollPosts from '../hooks/usePostInfiniteScroll';

const HomePage: React.FC = () => {
  const { posts, lastPostRef, loading } = useInfiniteScrollPosts(1, '/post');

  return (
    <>
      <Nav />
      <div className={styles.homePageContainer}>
        <div className='posts'>
          <h1 className={styles.yourFeed}>Your Feed</h1>
          {posts.map((post, index) => {
            if (index === posts.length - 1) {
              return (
                <div ref={lastPostRef} key={post._id}>
                  <DisplayPost
                    description={post.description}
                    title={post.title}
                    comments={post.comments}
                    likes={post.likes}
                    threadName={'t/' + post.thread_id.title}
                    username={post.user_id.username}
                    thread_id={post.thread_id._id}
                    className={styles.postContainer}
                  />
                </div>
              );
            } else {
              return (
                <DisplayPost
                  key={post._id}
                  description={post.description}
                  title={post.title}
                  comments={post.comments}
                  likes={post.likes}
                  threadName={'t/' + post.thread_id.title}
                  username={post.user_id.username}
                  thread_id={post.thread_id._id}
                  className={styles.postContainer}
                />
              );
            }
          })}
        </div>
        {loading && <p>Loading more posts...</p>}
        <GetStarted />
      </div>
    </>
  );
};

export default HomePage;
