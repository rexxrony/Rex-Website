
import styles from './App.module.css'
import { About } from './components/About/About'
import { Contact } from './components/Contact/Contact'
import { Footer } from './components/Footer/Footer'
import { Landing } from './components/Landing/Landing'
import { MyProjects } from './components/MyProjects/MyProjects'
import { Navbar } from './components/Navbar/Navbar'
import { Work } from './components/Work/Work'


function App() {

  return (<>
  <div className={styles.App}>
    <Navbar />
    <Landing />
    <About />
    <Work />
    <MyProjects />
    <Contact />
    <Footer />
    </div>
  </>
  )
}

export default App
