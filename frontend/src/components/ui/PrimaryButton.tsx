import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
};

export const PrimaryButton: FC<Props> = ({
  children,
  type = "button",
  onClick,
  icon,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
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
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};
