import { Link, LinkProps } from "react-router-dom";
import styles from "./styles.module.css";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "active" | "acrylic" | "acrylic-active" | "outlined" | "disabled" | "error" | "dark";
  nospacing?: boolean;
  onClick?: () => void;
  icon?: JSX.Element;
}

interface RouterButtonProps extends ButtonProps {
  to: LinkProps["to"];
}

export function Button({ variant, children, nospacing, onClick, icon }: ButtonProps) {
  return (
    <button onClick={onClick} className={`${styles.button} ${icon ? styles.left : ""} ${nospacing ? styles.nospacing : ""} ${variant ? styles[variant] : ""}`}>
      {icon}
      {children}
    </button>
  );
}

export function RouterButton({ variant, children, to, nospacing, onClick, icon }: RouterButtonProps) {
  return (
    <Link to={to} onClick={onClick} className={`${styles.button} ${icon ? styles.left : ""} ${nospacing ? styles.nospacing : ""} ${variant ? styles[variant] : ""}`}>
      {icon}
      {children}
    </Link>
  );
}
