import React from 'react'
import styles from './Footer.module.css'
import { FaGithub } from 'react-icons/fa'
import { FaLinkedinIn } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { FaYoutube } from 'react-icons/fa'

export const Footer = () => {
  return (
    <section className={styles.container}>
      <div className={styles.contents}>
        <a className={styles.logo} href="/">
          {'</'}Rex{'>'}
        </a>
        <a className={styles.phone} href="tel:+91 6282399702">
          +91 6282399702
        </a>
        <a className={styles.email} href="mailto:contact@rexronyjacob.com">
          contact@rexronyjacob.com
        </a>
        <div className={styles.socials}>
          <a href="https://github.com/rexxrony" target="_blank" rel="noreferrer" className={styles.socialLink}>
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/rexrony/" target="_blank" rel="noreferrer" className={styles.socialLink}>
            <FaLinkedinIn />
          </a>
          <a href="mailto:contact@rexronyjacob.com" target="_blank" rel="noreferrer" className={styles.socialLink}>
            <MdEmail />
          </a>
          <a href="https://www.youtube.com/@rexronyjacob" target="_blank" rel="noreferrer" className={styles.socialLink}>
            <FaYoutube />
          </a>
        </div>
      </div>
    </section>
  )
}
