import { Link } from 'react-router-dom'
import Dither from '../components/Dither/Dither'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <div className={styles.home}>
      <div className={styles.backgroundLayer} aria-hidden="true">
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction
          mouseRadius={0.3}
          colorNum={5.2}
          waveAmplitude={0.2}
          waveFrequency={3}
          waveSpeed={0.05}
        />
      </div>
      <section className={styles.container}>
        <div className={styles.content}>
          <div className={styles.nameBlock}>
            <p className={styles.body}>REX</p>
            <p className={styles.subBody}>RONY JACOB</p>
          </div>
          <br />
          <ul className={styles.links}>
            <li>
              <Link to="/dev" className={styles.linkButton}>
                Dev Portfolio
              </Link>
            </li>
            <li>
              <Link to="/photography" className={styles.linkButton}>
                Photography
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}
