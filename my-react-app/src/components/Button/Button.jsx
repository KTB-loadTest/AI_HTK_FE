import styles from './Button.module.css';

export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  icon: Icon,
  className = ''
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]} ${className}`}
    >
      {Icon && (
        <span className={styles.icon}>
          <Icon />
        </span>
      )}
      {children}
    </button>
  );
}
