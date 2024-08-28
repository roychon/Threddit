interface FormInputProps {
  type: string;
  name: string;
  placeholder: string;
  className: string;
}

const FormInput: React.FC<FormInputProps> = ({
  type,
  name,
  placeholder,
  className,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default FormInput;
