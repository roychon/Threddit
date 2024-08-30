import styles from '../styles/HomePage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from '../helpers/axios';

const Nav = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [threads, setThreads] = useState([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // On mount and when the keywords change, fetch from the backend:
  useEffect(() => {
    if (keyword.length > 0 && isFocused) {
      const fetchThreads = () => {
        try {
          const response = axios.post('/threads', {
            keyword: keyword,
          });
          console.log(response);
          //   setThreads(response);
          setKeyword('');
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

  const handleBlur = (): void => {
    setIsFocused(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.titleCircle}></div>
        <h2>Threddit</h2>
      </div>
      <div className={styles.searchbarContainer}>
        <button className={styles.searchButton}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        <input
          className={styles.searchBar}
          type='text'
          placeholder='Search threads'
          value={keyword}
          onChange={handleChange}
          onKeyDown={handleEnter}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {isFocused && threads.length > 0 && (
          <ul>
            {threads.slice(0, 5).map((thread) => {
              // return <li key={}>{}</li>;
            })}
          </ul>
        )}
      </div>
      <button className={styles.signInButton}>Sign in</button>
    </div>
  );
};
export default Nav;
