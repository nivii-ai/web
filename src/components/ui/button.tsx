"use client";

import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
}

export function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "bg-brand-green text-white text-body-s font-semibold px-4 py-2 rounded-lg hover:bg-brand-green-dark transition-all duration-100 active:scale-[0.97] cursor-pointer",
        fullWidth ? "w-full" : "w-fit"
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
