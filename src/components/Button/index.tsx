import styles from "./styles.module.css";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "active" | "acrylic" | "acrylic-active" | "outlined";
}

export function Button({ variant, children }: ButtonProps) {
  return <div className={`${styles.button} ${variant ? styles[variant] : ""}`}>{children}</div>;
}
