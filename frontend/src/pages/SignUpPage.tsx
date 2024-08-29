import { useNavigate } from 'react-router-dom';
import styles from '../styles/Authorization.module.css';
import FormTitle from '../components/FormTitle';
import FormInput from '../components/FormInput';
import FormPrompt from '../components/FormPrompt';
import { ChangeEvent, useState } from 'react';
import axios from '../helpers/axios';

const SignUpPage = () => {
  // State
  const [usernameText, setUserNameText] = useState<string>('');
  const [passwordText, setPasswordText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

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
    // Send data to backend
    try {
      const response = await axios.post('/sign-up', {
        username: usernameText,
        password: passwordText,
      });
      console.log(response);
      setUserNameText('');
      setPasswordText('');
      setError('');
    } catch (error) {
      console.error(error);
      setError(error.response.data || 'Unexpected error occured');
    }
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };

  return (
    <>
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
              className={!error ? styles.input : styles.inputError}
            />
            {error && <div className={styles.error}>{error}</div>}
          </div>
          <FormInput
            type='password'
            name='password'
            placeholder='Password'
            value={passwordText}
            onChange={handlePasswordChange}
            className={styles.input}
          />
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
    </>
  );
};

export default SignUpPage;
