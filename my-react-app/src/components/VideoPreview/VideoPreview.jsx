import styles from './VideoPreview.module.css';

export default function VideoPreview({ icon: Icon, title, description }) {
  return (
    <div className={styles.previewContainer}>
      <div className={styles.iconWrapper}>
        {Icon && <Icon />}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
