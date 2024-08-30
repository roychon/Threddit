import styles from '../styles/HomePage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.circle}></div>
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
        />
      </div>
      <button className={styles.signInButton}>Sign in</button>
    </div>
  );
};
export default Nav;
