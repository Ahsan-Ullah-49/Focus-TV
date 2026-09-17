import React from "react";
import styles from "./Container.module.css";

interface ContainerProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  id?: string;
}

export function Container({ children, size = "lg", className = "", id }: ContainerProps) {
  return (
    <div id={id} className={`${styles.container} ${styles[size]} ${className}`}>
      {children}
    </div>
  );
}
