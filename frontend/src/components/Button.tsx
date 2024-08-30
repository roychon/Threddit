interface ButtonProps {
    text: string;
    style?: React.CSSProperties;
    id?: string;
    handleClick: () => void;
  }
  
  function Button(props: ButtonProps) {
    return (
      <button
        style={props.style}
        id={props.id}
        onClick={props.handleClick}
        className="btn border-radius-10px"
      >
        {props.text}
      </button>
    );
  }
  
  export default Button;