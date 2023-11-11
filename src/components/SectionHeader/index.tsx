import styles from "./styles.module.css";

export default function SectionHeader({ children, center }: { children: React.ReactNode, center: boolean }) {
  
  return (
    <header className={styles["we-section-header"]}>
      <h1 className={center ? styles["center"] : ""}>{children}</h1>
    </header>
  );
}
