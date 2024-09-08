import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Authorization.module.css';

interface FormInputProps {
  type: string;
  name: string;
  placeholder?: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  type,
  name,
  placeholder,
  className,
  value,
  onChange,
}) => {
  const [inputType, setInputType] = useState(type);
  const [icon, setIcon] = useState(faEye);

  const togglePasswordVisibility = () => {
    const newInputType = inputType === 'password' ? 'text' : 'password';
    setInputType(newInputType);
    setIcon(newInputType === 'password' ? faEye : faEyeSlash);
  };

  return (
    <div className={styles.inputBox}>
      <input
        type={inputType}
        name={name}
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={onChange}
      />
      {type === 'password' && (
        <>
          <FontAwesomeIcon
            icon={icon}
            onClick={togglePasswordVisibility}
            className={styles.toggleButton}
          />
        </>
      )}
      {type === 'text' && (
        <>
          <FontAwesomeIcon icon={faUser} className={styles.toggleButton} />
        </>
      )}
    </div>
  );
};

export default FormInput;
