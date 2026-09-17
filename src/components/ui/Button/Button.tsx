import React from "react";
import Link from "next/link";
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "text";
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
}

export function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  disabled = false,
  type = "button",
  ariaLabel,
}: ButtonProps) {
  const combinedClassName = `${styles.button} ${styles[variant]} ${
    disabled ? styles.disabled : ""
  } ${className}`;

  if (href && !disabled) {
    return (
      <Link
        href={href}
        className={combinedClassName}
        onClick={onClick}
        aria-label={ariaLabel}
        data-cursor="interactive"
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      data-cursor="interactive"
    >
      {children}
    </button>
  );
}
