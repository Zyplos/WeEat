import { Link, LinkProps } from "react-router-dom";
import styles from "./styles.module.css";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "active" | "acrylic" | "acrylic-active" | "outlined";
  nospacing?: boolean;
  onClick?: () => void;
}

interface RouterButtonProps extends ButtonProps {
  to: LinkProps["to"];
}

export function Button({ variant, children, nospacing, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={`${styles.button} ${nospacing ? styles.nospacing : ""} ${variant ? styles[variant] : ""}`}>
      {children}
    </button>
  );
}

export function RouterButton({ variant, children, to, nospacing, onClick }: RouterButtonProps) {
  return (
    <Link to={to} onClick={onClick} className={`${styles.button} ${nospacing ? styles.nospacing : ""} ${variant ? styles[variant] : ""}`}>
      {children}
    </Link>
  );
}
