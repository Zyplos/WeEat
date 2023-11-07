import styles from "./styles.module.css";

interface Props {
  children: React.ReactNode;
  variant?: "active";
}

export default function Card({ variant, children }: Props) {
  return <div className={`${styles.card} ${variant == "active" ? styles.active : ""}`}>{children}</div>;
}
