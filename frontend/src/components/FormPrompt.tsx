import styles from '../styles/Authorization.module.css';

interface SignInPromptProps {
  text: string;
  prompt: string;
  handleClick: () => void;
}

const SignInPrompt: React.FC<SignInPromptProps> = ({
  text,
  prompt,
  handleClick,
}) => (
  <div className={styles.message2}>
    {text}
    <span className={styles.span} onClick={handleClick}>
      {prompt}
    </span>
  </div>
);
export default SignInPrompt;
