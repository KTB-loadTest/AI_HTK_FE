import styles from './Input.module.css';

export default function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  icon: Icon,
  disabled = false,
  className = ''
}) {
  return (
    <div className={`${styles.inputWrapper} ${className}`}>
      {Icon && (
        <div className={styles.icon}>
          <Icon />
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={styles.input}
      />
    </div>
  );
}
