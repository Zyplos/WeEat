import styles from "./styles.module.css";

interface TextInputProps {
  placeholder?: string;
  inputRef: any;
  onChange: any;
}

export function TextInput({ placeholder, inputRef, onChange }: TextInputProps) {
  return <input ref={inputRef} onChange={onChange} className={styles["text-input"]} type="text" placeholder={placeholder} />;
}
