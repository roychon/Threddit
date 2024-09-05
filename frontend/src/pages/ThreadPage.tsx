import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../helpers/axios';
import DisplayPost from '../components/DisplayPost';
import AboutThread from '../components/AboutThread';
import styles from '../styles/ThreadPage.module.css';

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
  const [threadInfo, setThreadInfo] = useState<ThreadProps | null>(null);
  const [posts, setPosts] = useState<[DisplayPostProps] | null>(null);
  const { threadID } = useParams();
  useEffect(() => {
    const fetchThreadPosts = async () => {
      try {
        const data = await axios.get(`/thread/posts/${threadID}`);
        setPosts(data.data.threadPosts);
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
    fetchThreadPosts();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <div className={styles.left}>
          <Link to='/' className={styles.link}>
            Back home
          </Link>
          <p className={styles.link2}>r/{threadInfo?.threadName}</p>
        </div>
        {posts &&
          posts.map((post) => {
            return (
              <DisplayPost
                className={styles.postContainer}
                key={post._id}
                description={post.description}
                title={post.title}
                comments={post.comments}
                likes={post.likes}
                threadName={post.threadName}
                username={post.user_id.username}
                thread_id={post.thread_id}
              />
            );
          })}
      </div>
      <div className={styles.right}>
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
    </div>
  );
};

export default ThreadPage;
