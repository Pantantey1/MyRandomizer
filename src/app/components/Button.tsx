interface ButtonProps {
    text: string;
    onClick?: () => void;
  }
  
  export default function Button({ text, onClick }: ButtonProps) {
    return (
      <button
        onClick={onClick}
        className="bg-yellow-400 text-black border border-blue-500 rounded-[9px] px-4 py-2 hover:bg-green-500 hover:text-red-500"
      >
        {text}
      </button>
    );
  }
  