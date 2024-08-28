import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/sign-in');
  };

  return (
    <>
      <div className='signup-page-container'>
        <form action='/sign-up-form' method='post' className='sign-up-form'>
          <h1 className='sign-up-title'>Create An Account</h1>
          <p className='sign-up-form-message'>
            Create an account to enjoy all ther services without any ads for
            free!
          </p>
          <input
            type='text'
            name='username'
            placeholder='Username'
            className='sign-up-input'
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            className='sign-up-input'
          />
          <button type='submit' className='sign-up-submit-button'>
            Create Account
          </button>
          <div className='sign-up-form-message2'>
            Already Have An Account?
            <span className='sign-up-span' onClick={handleClick}>
              Sign In
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpPage;
