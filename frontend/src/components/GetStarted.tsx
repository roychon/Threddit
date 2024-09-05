import { useNavigate } from 'react-router-dom';
import styles from '../styles/HomePage.module.css';

const GetStarted = () => {
  const navigate = useNavigate();
  return (
    <section id='get-started' className={styles.getStarted}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3>
          Get started with Threddit,
          <br /> check in with your community
        </h3>
        <button
          onClick={() => navigate('/thread')}
          id='home-pg-create-thread-btn'
        >
          Create Thread
        </button>
      </div>
    </section>
  );
};

export default GetStarted;
