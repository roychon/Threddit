import { useEffect, useState, useRef, useCallback } from 'react';
import Nav from '../components/Nav';
import axios from '../helpers/axios';
import DisplayPost from '../components/DisplayPost';
import styles from '../styles/HomePage.module.css';
import GetStarted from '../components/GetStarted';

// Define the interface for the post data
interface Post {
  _id: string;
  description: string;
  title: string;
  comments: string[];
  likes: number;
  thread_id: {
    _id: string;
    title: string;
  };
  user_id: {
    username: string;
  };
}

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Ref for Intersection Observer
  const observer = useRef<IntersectionObserver | null>(null);

  // Fetch posts with pagination
  const fetchPosts = async (page: number) => {
    setLoading(true);
    try {
      console.log(`Fetching posts for page ${page}`); // Log when fetching starts
      const response = await axios.get(`/post?page=${page}&limit=5`);
      console.log(`Fetched ${response.data.posts.length} posts`); // Log the number of posts fetched
      setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
      setHasMore(response.data.posts.length > 0); // Check if there are more posts to load
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load initial posts and subsequent posts on page change
  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  // Intersection observer callback to trigger loading more posts
  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log('Bottom of the page reached, loading more posts'); // Log when bottom is reached
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

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
