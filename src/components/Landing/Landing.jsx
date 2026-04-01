import { useEffect, useState } from 'react'
import styles from './Landing.module.css'
import DecryptedText from '../DecryptedText/DecryptedText'
import { FaGithub, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { FaFileArrowDown } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'

export const Landing = () => {
  const [backgroundRotation, setBackgroundRotation] = useState(0)

  useEffect(() => {
    let ticking = false

    const updateRotation = () => {
      setBackgroundRotation(window.scrollY * 0.03)
      ticking = false
    }

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(updateRotation)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section
      className={styles.container}
      style={{ '--bg-rotation': `${backgroundRotation}deg` }}
    >
      <div className={styles.content}>
        <p className={styles.body}>
          <DecryptedText
            text="Hi I am Rex Rony Jacob"
            animateOn="inViewHover"
            speed={80}
            revealDirection="start"
            sequential
            useOriginalCharsOnly={false}
            className={styles.revealed}
            parentClassName={styles.decryptLine}
            encryptedClassName={styles.encrypted}
          />
        </p>
        <br />
        <h1 className={styles.title}>
          <DecryptedText
            text="A Full-Stack Developer"
            animateOn="inViewHover"
            speed={80}
            revealDirection="start"
            sequential
            useOriginalCharsOnly={false}
            className={styles.revealed}
            parentClassName={styles.decryptLine}
            encryptedClassName={styles.encrypted}
          />
        </h1>
        <p className={styles.body2}>
          <DecryptedText
            text="Welcome to my website! Feel free to scroll down to know more about me."
            animateOn="inViewHover"
            speed={80}
            revealDirection="start"
            sequential
            useOriginalCharsOnly={false}
            className={styles.revealed}
            parentClassName={styles.decryptParagraph}
            encryptedClassName={styles.encrypted}
          />
        </p>

        <br />
        <br />
        <br />
        <br />
        <ul className={styles.socials}>
          <li>
            <a href="https://github.com/rexxrony" className={styles.socialLink} target="_blank" rel="noreferrer">
              <FaGithub /> Github
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/rexrony/" className={styles.socialLink} target="_blank" rel="noreferrer">
              <FaLinkedinIn /> LinkedIn
            </a>
          </li>
          <li>
            <a href="mailto:contact@rexronyjacob.com" className={styles.socialLink} target="_blank" rel="noreferrer">
              <MdEmail /> Email
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@rexronyjacob" className={styles.socialLink} target="_blank" rel="noreferrer">
              <FaYoutube /> Youtube
            </a>
          </li>
          <li>
            <a
              href="https://drive.google.com/file/d/1lFZCAppVJv6vgE45n_A93zv-O-EpbkPu/view?usp=share_link"
              className={styles.socialLink}
              target="_blank"
              rel="noreferrer"
            >
              <FaFileArrowDown /> Resume
            </a>
          </li>
        </ul>
        <br />
        <br />
        <br />
      </div>
    </section>
  )
}
