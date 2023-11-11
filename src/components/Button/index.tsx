import { Link, LinkProps } from "react-router-dom";
import styles from "./styles.module.css";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "active" | "acrylic" | "acrylic-active" | "outlined";
  nospacing?: boolean;
}

interface RouterButtonProps extends ButtonProps {
  to: LinkProps["to"];
}

export function Button({ variant, children, nospacing }: ButtonProps) {
  return <div className={`${styles.button} ${nospacing ? styles.nospacing : ""} ${variant ? styles[variant] : ""}`}>{children}</div>;
}

export function RouterButton({ variant, children, to, nospacing }: RouterButtonProps) {
  return (
    <Link to={to} className={`${styles.button} ${nospacing ? styles.nospacing : ""} ${variant ? styles[variant] : ""}`}>
      {children}
    </Link>
  );
}
