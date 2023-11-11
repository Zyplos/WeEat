import styles from "./styles.module.css";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles["main-layout"]}>{children}</div>;
}
