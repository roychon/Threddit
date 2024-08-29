import { useNavigate } from 'react-router-dom';
import styles from '../styles/Authorization.module.css';
import FormTitle from '../components/FormTitle';
import FormInput from '../components/FormInput';
import FormPrompt from '../components/FormPrompt';
import { ChangeEvent, useState } from 'react';
import axios from '../helpers/axios';

const SignInPage = () => {
  // State
  const [usernameText, setUserNameText] = useState<string>('');
  const [passwordText, setPasswordText] = useState<string>('');

  // Setters
  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserNameText(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPasswordText(e.target.value);
  };

  // Events
  const onClick = async () => {
    // Send data to backend
    try {
      await axios.post('/sign-up', {
        username: usernameText,
        password: passwordText,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  return (
    <>
      <div className={styles.container}>
        <form className={styles.signUpForm}>
          <FormTitle
            title='Log In'
            message='Log in to enjoy all the services without any ads for free!'
          />
          <FormInput
            type='text'
            name='username'
            placeholder='Username'
            value={usernameText}
            onChange={handleUserNameChange}
            className={styles.input}
          />
          <FormInput
            type='password'
            name='password'
            placeholder='Password'
            value={passwordText}
            onChange={handlePasswordChange}
            className={styles.input}
          />
          <button type='submit' className={styles.button} onClick={onClick}>
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
