import styles from '../styles/HomePage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import {
  ChangeEvent,
  FocusEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import axios from '../helpers/axios';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const Nav = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [threads, setThreads] = useState<any>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [profilePicStyle, setProfilePicStyle] = useState<Object>({});
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const location = useLocation();

  // Context
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext?.user?.gradient) {
      setProfilePicStyle({ background: authContext!.user!.gradient });
    }
  }, [authContext]);

  useEffect(() => {
    const controller = new AbortController();

    if (keyword.length > 0 && isFocused) {
      const fetchThreads = async () => {
        try {
          const response = await axios.post(
            '/thread/search-bar',
            { keyword: keyword },
            { signal: controller.signal }
          );
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
      setThreads([]);
    }

    return () => {
      controller.abort();
    };
  }, [keyword, isFocused]);

  useEffect(() => {
    setKeyword('');
  }, [location]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setKeyword(e.target.value);
  };

  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keyword) {
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
    e.preventDefault();
  };

  const handleMouseEnter = (): void => {
    setShowMenu(true);
  };

  const handleMouseLeave = (): void => {
    setShowMenu(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <img
            className={styles.logo}
            src='https://www.ucraft.com/ai-logo-generator/app/_next/image?url=https%3A%2F%2Fstatic.ucraft.ai%2Ffs%2Flogos%2Fpng%2Ff15e5987-036f-4d83-88f4-f645bd29c81e%2Fmobile%2F69a39d3a-92e8-4c2c-ad08-36176d030e37.png%3F1725741000476&w=1080&q=75'
            alt='Threddit Logo'
          />
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
                  {threads.map((thread: any) => (
                    <li key={thread._id} className={styles.threads}>
                      <Link to={`/thread/${thread._id}`}>
                        <p>t/{thread.title}</p>
                        <p>Members: {thread.members.length}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div
          className={styles.profilePic}
          style={profilePicStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {showMenu && (
            <div className={styles.dropdownMenu}>
              <ul>
                <li>
                  <Link to='/threads'>Threads</Link>
                </li>
                <li>
                  <Link to='/settings'>Settings</Link>
                </li>
                <li>
                  <Link to='/signout'>Sign Out</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Nav;
