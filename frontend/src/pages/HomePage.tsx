import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import axios from '../helpers/axios';

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
      {initialPosts &&
        initialPosts.map((post) => {
          return <li key={post.user_id}>{post.description}</li>;
        })}
    </>
  );
};

export default HomePage;
