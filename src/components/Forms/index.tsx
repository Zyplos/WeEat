import styles from "./styles.module.css";

interface TextInputProps {
  placeholder?: string;
}

export function TextInput({ placeholder }: TextInputProps) {
  return <input className={styles["text-input"]} type="text" placeholder={placeholder} />;
}
