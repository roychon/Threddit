import { useNavigate } from 'react-router-dom';
import styles from '../styles/Authorization.module.css';
import FormTitle from '../components/FormTitle';
import FormInput from '../components/FormInput';
import FormPrompt from '../components/FormPrompt';
import { ChangeEvent, useState } from 'react';
import axios from '../helpers/axios';
import { AuthContext } from '../context/AuthProvider';
import { useContext } from 'react';

const SignUpPage = () => {
  // State
  const [usernameText, setUserNameText] = useState<string>('');
  const [passwordText, setPasswordText] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [userError, setUserError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Context
  const authContext = useContext(AuthContext);

  const generateRandomGradient = (): string => {
    const color1 = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    const color2 = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return `linear-gradient(${Math.floor(
      Math.random() * 360
    )}deg, ${color1}, ${color2})`;
  };

  // Setters
  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserNameText(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPasswordText(e.target.value);
  };

  // Events
  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPasswordError('');
    setUserError('');
    // Generate a random gradient and create the profile picture
    const gradient = generateRandomGradient();

    try {
      const response = await axios.post('/sign-up', {
        username: usernameText,
        password: passwordText,
        gradient: gradient,
      });

      console.log(response);
      setUserNameText('');
      setPasswordText('');
      setError('');

      // Update AuthContext state here if needed
      if (authContext) {
        authContext.setIsLoggedIn(true);
        authContext.setUser({
          username: usernameText,
          _id: response.data.id,
          gradient: gradient,
        });
      }

      // Navigate to homepage on successful sign-up
      navigate('/');
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data || 'Unexpected error occurred';

      if (errorMessage.includes('Password')) {
        setPasswordError(
          'Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.'
        );
      } else if (errorMessage === 'A user with that username already exists') {
        setUserError('Username is already taken.');
      } else if (errorMessage.includes('5')) {
        setUserError('Username must be at least 5 letters');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <form className={styles.signUpForm}>
        <FormTitle
          title='Create An Account'
          message='Create an account to enjoy all the services without any ads for free!'
        />
        <div className='username'>
          <FormInput
            type='text'
            name='username'
            placeholder='Username'
            value={usernameText}
            onChange={handleUserNameChange}
            className={!userError ? styles.input : styles.inputError}
          />
          {userError && <div className={styles.error}>{userError}</div>}
        </div>
        <FormInput
          type='password'
          name='password'
          placeholder='Password'
          value={passwordText}
          onChange={handlePasswordChange}
          className={!passwordError ? styles.input : styles.inputError}
        />
        {passwordError && <div className={styles.error}>{passwordError}</div>}
        {error && <div className={styles.error}>{error}</div>}
        <button type='submit' className={styles.button} onClick={onClick}>
          Create Account
        </button>
        <FormPrompt
          text='Already Have an Account?'
          prompt='Log In'
          handleClick={handleClick}
        />
      </form>
    </div>
  );
};

export default SignUpPage;
