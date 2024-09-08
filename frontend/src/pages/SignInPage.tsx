import { useContext, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../helpers/axios';
import { AuthContext } from '../context/AuthProvider';
import styles from '../styles/Authorization.module.css';
import FormTitle from '../components/FormTitle';
import FormInput from '../components/FormInput';
import FormPrompt from '../components/FormPrompt';

const SignInPage = () => {
  const [usernameText, setUserNameText] = useState<string>('');
  const [passwordText, setPasswordText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserNameText(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPasswordText(e.target.value);
  };

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', {
        username: usernameText,
        password: passwordText,
      });

      setUserNameText('');
      setPasswordText('');
      setError(null);

      // Update AuthContext state here
      if (authContext) {
        authContext.setIsLoggedIn(true);
        authContext.setUser({
          username: response.data.username,
          _id: response.data.id,
          gradient: response.data.gradient,
        });
      }

      // Navigate to homepage on successful login
      navigate('/');
    } catch (error: any) {
      console.error('ERROR: ', error);
      setError(error.response?.data.message || 'Unexpected error occurred');
    }
  };

  const handleClick = () => {
    navigate('/sign-up');
  };

  return (
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
          className={!error ? styles.input : styles.inputError}
        />
        <FormInput
          type='password'
          name='password'
          placeholder='Password'
          value={passwordText}
          onChange={handlePasswordChange}
          className={!error ? styles.input : styles.inputError}
        />
        {error && <div className={styles.error}>{error}</div>}
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
  );
};

export default SignInPage;
