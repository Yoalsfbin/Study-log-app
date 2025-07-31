import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

type Props = {
  to: string;
  children: React.ReactNode;
  className?: string;
};

export const LinkButton = ({ to, children, className = "" }: Props) => {
  return (
    <Link
      to={to}
      className={`
        inline-flex items-center gap-2 justify-center
        px-6 py-3 rounded-full font-semibold text-white
        bg-gradient-to-r from-blue-500 to-purple-500
        hover:from-blue-600 hover:to-purple-600
        shadow-lg hover:shadow-xl
        transform hover:scale-105 transition duration-300 ease-in-out
        ${className}
      `}
    >
      {children}
      <FaArrowRight className="w-4 h-4" />
    </Link>
  );
};
