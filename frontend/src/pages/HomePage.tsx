import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import axios from '../helpers/axios';
import DisplayPost from '../components/DisplayPost';
import styles from '../styles/HomePage.module.css';

const HomePage = () => {
  // Write in TypeScript
  const [initialPosts, setInitialPosts] = useState(null);

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
      {initialPosts &&
        initialPosts.map((post) => {
          return (
            <DisplayPost
              key={post._id}
              description={post.description}
              title={post.title}
              comments={post.comments}
              likes={post.likes}
              threadName={post.threadName}
              username={post.user_id}
            />
          );
        })}
    </>
  );
};

export default HomePage;
