import styles from "./styles.module.css";

export default function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <header className={styles["we-section-header"]}>
      <h1>{children}</h1>
    </header>
  );
}
