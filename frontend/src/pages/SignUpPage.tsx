import { useNavigate } from 'react-router-dom';
import styles from '../styles/Authorization.module.css';
import FormTitle from '../components/FormTitle';
import FormInput from '../components/FormInput';
import FormPrompt from '../components/FormPrompt';

const SignUpPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/sign-in');
  };

  return (
    <>
      <div className={styles.container}>
        <form
          action='/sign-up-form'
          method='post'
          className={styles.signUpForm}
        >
          <FormTitle
            title='Create An Account'
            message='Create an account to enjoy all the services without any ads for free!'
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
            Create Account
          </button>
          <FormPrompt
            text='Already Have an Account?'
            prompt='Sign In'
            handleClick={handleClick}
          />
        </form>
      </div>
    </>
  );
};

export default SignUpPage;
