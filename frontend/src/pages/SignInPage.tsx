import { useNavigate } from 'react-router-dom';
import styles from '../styles/Authorization.module.css';
import FormTitle from '../components/FormTitle';
import FormInput from '../components/FormInput';
import FormPrompt from '../components/FormPrompt';

const SignInPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  return (
    <>
      <div className={styles.container}>
        <form
          action='/sign-in-form'
          method='post'
          className={styles.signUpForm}
        >
          <FormTitle
            title='Log In'
            message='Log in to enjoy all the services without any ads for free!'
          />
          <FormInput
            type='text'
            name='username'
            placeholder='Username'
            className={styles.input}
          />
          <FormInput
            type='password'
            name='password'
            placeholder='Password'
            className={styles.input}
          />
          <button type='submit' className={styles.button}>
            Log In
          </button>
          <FormPrompt
            text="Don't Have an Account?"
            prompt='Sign Up'
            handleClick={handleClick}
          />
        </form>
      </div>
    </>
  );
};

export default SignInPage;
