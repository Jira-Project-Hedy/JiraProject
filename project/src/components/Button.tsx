interface IButtonProps {
    name: string;
    onClick?: () => void
  }
  
  const Button = ({ name, onClick }: IButtonProps) => {
    return (
      <button
        type="submit"
        className="w-full mb-8 mt-8 bg-black-btn hover:bg-black-hover hover:text-white text-xl text-gray-bg-light p-4 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
        onClick={onClick}
      >
        {name}
      </button>
    );
  }
  
  export default Button;