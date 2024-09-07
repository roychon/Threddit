import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../helpers/axios';
import DisplayPost from '../components/DisplayPost';
import AboutThread from '../components/AboutThread';
import styles from '../styles/ThreadPage.module.css';
import useInfiniteScrollPosts from '../hooks/useThreadPostInfiniteScroll';

interface UserProps {
  username: string;
}

interface DisplayPostProps {
  threadName: string;
  username: string;
  title: string;
  description: string;
  comments: any;
  likes: number;
  user_id: UserProps;
  thread_id: any;
  _id: any;
}

interface ThreadProps {
  numMembers: Number;
  numPosts: Number;
  threadCreator: string;
  threadName: string;
  threadID: any;
}

const ThreadPage = () => {
  const { threadID } = useParams();
  const endpoint = `/thread/posts/${threadID}`;
  const [threadInfo, setThreadInfo] = useState<ThreadProps | null>(null);

  // Use the custom hook for infinite scrolling
  const { posts, lastPostRef, loading, hasMore, setPosts, setPage } =
    useInfiniteScrollPosts(1, endpoint);

  useEffect(() => {
    const fetchThreadInfo = async () => {
      try {
        const data = await axios.get(`/thread/posts/${threadID}`);
        // setThreadInfo(data.data.threadPosts);
        console.log('data', data.data);
        setThreadInfo({
          threadID: data.data.threadID,
          threadName: data.data.threadName,
          numMembers: data.data.numMembers,
          numPosts: data.data.numPosts,
          threadCreator: data.data.threadCreator.username,
        });
      } catch (e) {
        console.log('ERROR: ', e);
      }
    };
    fetchThreadInfo();
  }, [threadID]);

  // Reset posts when threadID changes
  useEffect(() => {
    setPosts([]);
    setPage(1);
  }, [threadID]);

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        <Link to='/' className={styles.link}>
          Back home
        </Link>
        <p className={styles.link2}>r/{threadInfo?.threadName}</p>
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
      {threadInfo && (
        <AboutThread
          threadID={threadInfo.threadID}
          threadName={threadInfo.threadName}
          numPosts={threadInfo.numPosts}
          threadCreator={threadInfo.threadCreator}
          numMembers={threadInfo.numMembers}
        />
      )}
    </div>
  );
};

export default ThreadPage;
