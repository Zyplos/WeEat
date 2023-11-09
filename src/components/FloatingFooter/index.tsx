import styles from "./styles.module.css";

export default function FloatingFooter({ children }: { children: React.ReactNode }) {
  return <footer className={styles.footer}>{children}</footer>;
}
