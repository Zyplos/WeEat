import styles from "./styles.module.css";

interface CardProps {
  children: React.ReactNode;
  variant?: "active";
}

interface ClickableCardProps extends CardProps {
  href: string;
  target?: string;
}

export function Card({ variant, children }: CardProps) {
  return <div className={`${styles.card} ${variant == "active" ? styles.active : ""}`}>{children}</div>;
}

export function ClickableCard({ href, target, variant, children }: ClickableCardProps) {
  return (
    <a href={href} target={target} className={styles.clickable}>
      <Card variant={variant}>{children}</Card>
    </a>
  );
}
