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
    if (keyword.length > 0 && isFocused) {
      const fetchThreads = async () => {
        try {
          const response = await axios.post('/thread/search-bar', {
            keyword: keyword,
          });
          // console.log(response.data);
          console.log(response.data.threads);
          setThreads(response.data.threads);
        } catch {
          console.log('Error');
        }
      };

      fetchThreads();
    } else {
      setThreads([]);
    }
  }, [keyword, isFocused]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setKeyword(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // code to send them to the '/threads' page
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
        <div className={styles.profile}></div>
      </div>
    </>
  );
};
export default Nav;
