import styles from "./styles.module.css";

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className={styles["we-header"]}>
      <h1>{children}</h1>
    </header>
  );
}
