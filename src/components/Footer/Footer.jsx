import React from 'react'
import styles from './Footer.module.css'
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";


export const Footer = () => {
    return (
        <section className={styles.container}>
            <div>
                <ul className={styles.contents}>
                    <li className={styles.logo}><a href='/'>{"</"}Rex{">"}</a></li>
                    <li className={styles.phone}><a href='tel:+91 6282399702'>+91 6282399702</a></li>
                    <li className={styles.email}><a href='mailto:contact@rexronyjacob.com'>contact@rexronyjacob.com</a></li>
                    <ul className={styles.socials}>
                        <li><a href='https://github.com/rexxrony' target="_blank" className={styles.git} > <FaGithub /></a></li>
                        <li><a href='https://www.linkedin.com/in/rexrony/' target="_blank" className={styles.linkedIn}><FaLinkedinIn /> </a></li>
                        <li><a href='mailto:contact@rexronyjacob.com' target="_blank" className={styles.insta}><MdEmail /></a></li>
                        <li><a href='https://www.youtube.com/@rexronyjacob' target="_blank" className={styles.yt}><FaYoutube /></a></li>
                    </ul>
                </ul>
            </div>
        </section>
    )
}
