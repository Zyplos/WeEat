import { Link, LinkProps } from "react-router-dom";
import styles from "./styles.module.css";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "active" | "acrylic" | "acrylic-active" | "outlined";
}

interface RouterButtonProps extends ButtonProps {
  to: LinkProps["to"];
}

export function Button({ variant, children }: ButtonProps) {
  return <div className={`${styles.button} ${variant ? styles[variant] : ""}`}>{children}</div>;
}

export function RouterButton({ variant, children, to }: RouterButtonProps) {
  return (
    <Link to={to} className={`${styles.button} ${variant ? styles[variant] : ""}`}>
      {children}
    </Link>
  );
}
