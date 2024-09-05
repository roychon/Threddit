import { useState, useEffect, useRef, useCallback } from 'react';
import axios from '../helpers/axios';

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

const useInfiniteScrollPosts = (initialPage: number, endpoint: string) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(initialPage);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const fetchPosts = async (page: number) => {
    setLoading(true);
    try {
      console.log(`Fetching posts for page ${page}`); // Log when fetching starts
      const response = await axios.get(`${endpoint}?page=${page}&limit=5`);
      console.log(`Fetched ${response.data.posts.length} posts`); // Log the number of posts fetched
      setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
      setHasMore(response.data.posts.length > 0); // Check if there are more posts to load
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page, endpoint]);

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

  return { posts, lastPostRef, loading, hasMore };
};

export default useInfiniteScrollPosts;
