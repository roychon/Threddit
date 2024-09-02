import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import axios from '../helpers/axios';
import DisplayPost from '../components/DisplayPost';
import styles from '../styles/HomePage.module.css';
import GetStarted from '../components/GetStarted';

const HomePage = () => {
  // Write in TypeScript
  const [initialPosts, setInitialPosts] = useState(null);

  // On mount, fetch the top 5 liked posts, then set it to initialPosts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/post');
        console.log(response.data.posts);
        setInitialPosts(response.data.posts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Nav />
      <h1 className={styles.yourFeed}>Your Feed</h1>
      <div className={styles.homePageContainer}>
        <div className='posts'>
          {initialPosts &&
            initialPosts.map((post) => {
              return (
                <DisplayPost
                  key={post._id}
                  description={post.description}
                  title={post.title}
                  comments={post.comments}
                  likes={post.likes}
                  threadName={"t/" + post.thread_id.title}
                  username={post.user_id.username}
                  thread_id={post.thread_id._id}
                />
              );
            })}
        </div>
        <GetStarted />
      </div>
    </>
  );
};

export default HomePage;
