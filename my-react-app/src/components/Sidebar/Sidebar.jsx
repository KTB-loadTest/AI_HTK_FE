import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

export default function Sidebar({ title, items }) {
  const location = useLocation();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <nav className={styles.nav}>
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              {Icon && (
                <span className={styles.navIcon}>
                  <Icon />
                </span>
              )}
              <span className={styles.navLabel}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
