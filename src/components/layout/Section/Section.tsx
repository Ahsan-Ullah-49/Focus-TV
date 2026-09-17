import React from "react";
import styles from "./Section.module.css";

interface SectionProps {
  children: React.ReactNode;
  spacing?: "sm" | "md" | "lg";
  className?: string;
  id?: string;
  as?: React.ElementType;
  style?: React.CSSProperties;
}

export function Section({
  children,
  spacing = "md",
  className = "",
  id,
  as: Component = "section",
  style,
}: SectionProps) {
  return (
    <Component
      id={id}
      className={`${styles.section} ${styles[spacing]} ${className}`}
      style={style}
    >
      {children}
    </Component>
  );
}
