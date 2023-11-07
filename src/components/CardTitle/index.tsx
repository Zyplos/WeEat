import styles from "./styles.module.css";

export default function CardTitle({ children }: { children: React.ReactNode }) {
  return <div className={styles["we-card-title"]}>{children}</div>;
}
