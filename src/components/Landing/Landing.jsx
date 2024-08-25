import React from 'react'
import styles from './Landing.module.css';
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";

export const Landing = () => {
  return (
    <section className={styles.container}>
        <div className={styles.content}>
        <p className={styles.body}> Hi, I'm <b>Rex Rony Jacob</b> <br></br></p>
        <br></br>
            <h1 className={styles.title}>A Full-Stack</h1>
            <h1 className={styles.title2}>Developer</h1>
            <p className={styles.body2}>            Welcome to my website! Feel free to scroll down to know more about me.</p>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <ul className={styles.socials}>
                <li><a href='https://github.com/rexxrony' className={styles.git} target="_blank" > <FaGithub /> Github</a></li> 
                <li><a href='https://www.linkedin.com/in/rexrony/' className={styles.linkedIn} target="_blank"><FaLinkedinIn /> LinkedIn</a></li>
                <li><a href='mailto:contact@rexronyjacob.com'className={styles.insta} target="_blank"><MdEmail /> Email</a></li>
                <li><a href='https://www.youtube.com/@rexronyjacob'className={styles.yt} target="_blank"><FaYoutube /> Youtube</a></li>
            </ul>
            <br></br>
            <br></br>
            <br></br>

        </div>
    </section>
  )
}
