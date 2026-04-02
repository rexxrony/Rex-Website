import styles from './Loader.module.css'

export const Loader = () => (
  <div className={styles.overlay} aria-live="polite" aria-label="Loading content">
    <div className={styles.spinner} />
  </div>
)
