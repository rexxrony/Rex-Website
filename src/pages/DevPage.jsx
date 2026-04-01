import styles from '../App.module.css'
import { About } from '../components/About/About'
import { Contact } from '../components/Contact/Contact'
import { Footer } from '../components/Footer/Footer'
import { Landing } from '../components/Landing/Landing'
import { MyProjects } from '../components/MyProjects/MyProjects'
import { Navbar } from '../components/Navbar/Navbar'
import Waves from '../components/Waves/Waves'
import { Work } from '../components/Work/Work'
import pageStyles from './DevPage.module.css'

export function DevPage() {
  return (
    <div className={`${styles.App} ${pageStyles.page}`}>
      <div className={pageStyles.backgroundLayer} aria-hidden="true">
      </div>
      <div className={pageStyles.content}>
        <Navbar />
        <Landing />
        <About />
        <Work />
        <MyProjects />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}
