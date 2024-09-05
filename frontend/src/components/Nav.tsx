import styles from '../styles/HomePage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import axios from '../helpers/axios';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [threads, setThreads] = useState<any>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // On mount and when the keywords change, fetch from the backend:
  useEffect(() => {
    const controller = new AbortController(); // Create a new AbortController instance

    if (keyword.length > 0 && isFocused) {
      const fetchThreads = async () => {
        try {
          console.log('Fetching threads with keyword:', keyword);
          const response = await axios.post(
            '/thread/search-bar',
            { keyword: keyword },
            { signal: controller.signal } // Pass the signal for cancellation
          );
          console.log('Response received:', response.data.threads);
          setThreads(response.data.threads);
        } catch (e) {
          if (e.name === 'AbortError') {
            console.log('Request canceled');
          } else {
            console.error('An error occurred:', e);
          }
        }
      };

      fetchThreads();
    } else {
      console.log('No keyword or not focused');
      setThreads([]);
    }

    return () => {
      console.log('Aborting request');
      controller.abort(); // Cancel the request if the component unmounts or dependencies change
    };
  }, [keyword, isFocused]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setKeyword(e.target.value);
  };

  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keyword) {
      // We can navigate them to a different page, and use the code below to useEffect once the page mounts to display. (Like HomePage)
      try {
        const response = await axios.post('/post/keyword', {
          keyword: keyword,
        });
        console.log(response.data.posts);
      } catch (error) {
        console.log('Error fetching posts');
      }
    }
  };

  const handleFocus = (): void => {
    setIsFocused(true);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement, Element>): void => {
    // setIsFocused(false);
    e.preventDefault();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.titleCircle}></div>
          <Link to={'/'} className={styles.titleName}>
            Threddit
          </Link>
        </div>
        <div className={styles.searchbarContainer}>
          <button className={styles.searchButton}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <div className={styles.inputColumn}>
            <input
              className={styles.searchBar}
              type='text'
              placeholder='Search Threddit'
              value={keyword}
              onChange={handleChange}
              onKeyDown={handleEnter}
              onFocus={handleFocus}
              onBlur={(e) => handleBlur(e)}
            />
            {threads.length > 0 && (
              <div className={styles.threadsContainer}>
                <ul>
                  <li>b</li>
                  {threads.slice(0, 1).map((thread: any) => {
                    return (
                      <li key={thread._id} className={styles.threads}>
                        <Link to={`/thread/${thread._id}`}>
                          <p>t/{thread.title}</p>
                          <p>Members: {thread.members.length}</p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
        <button className={styles.signInButton}>Sign in</button>
      </div>
    </>
  );
};
export default Nav;
