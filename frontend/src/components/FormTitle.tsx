import styles from '..//styles/Authorization.module.css';

interface FormTitleProps {
  title: string;
  message: string;
}

const FormTitle: React.FC<FormTitleProps> = ({ title, message }) => (
  <div className='title-wrapper'>
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.message}>{message}</p>
  </div>
);

export default FormTitle;
