import { useNavigate } from 'react-router-dom';
import styles from '../styles/Authorization.module.css';

const SignInPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  return (
    <>
      <div className={styles.container}>
        <form
          action='/sign-up-form'
          method='post'
          className={styles.signUpForm}
        >
          <div className='title-wrapper'>
            <h1 className={styles.title}>Log In</h1>
            <p className={styles.message}>
              Log in to enjoy all the services without any ads for free!
            </p>
          </div>
          <input
            type='text'
            name='username'
            placeholder='Username'
            className={styles.input}
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            className={styles.input}
          />
          <button type='submit' className={styles.button}>
            Log In
          </button>
          <div className={styles.message2}>
            Don't Have An Account?
            <span className={styles.span} onClick={handleClick}>
              Sign Up
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignInPage;
