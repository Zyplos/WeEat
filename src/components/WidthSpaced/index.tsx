import styles from "./styles.module.css";

export default function WidthSpaced({ children }: { children: React.ReactNode }) {
  return <div className={styles["width-spaced"]}>{children}</div>;
}


