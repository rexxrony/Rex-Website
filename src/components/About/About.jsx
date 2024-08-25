import React from 'react';
import rexImage from '../../assets/rex.jpg';
import styles from './About.module.css';

export const About = () => {
  return (
    <section id="about" className={styles.container}>
      <div className={styles.contents}>
        <h2 className={styles.title}>../About Me</h2>
        <div className={styles.flexContainer}>
          <div className={styles.textContent}>
            <p className={styles.intro}>I am Full-Stack developer with a background in Java Spring Boot, MySQL, and React. While being exposed practically to the design and deployment of strong web applications, I could familiarize myself with the development of efficient and scalable solutions. <br></br>My experience covers backend development, database management, and frontend design, thus enabling me to develop fully fledged software products.<br></br> I am passionate about making breakthrough, user-oriented applications, realizing that my journey to acquire knowledge and upgrade my skills is endless in the ever-evolving field of software development.</p>
           
            <p className={styles.introSmall}>I am Full-Stack developer with a background in Java Spring Boot, MySQL, and React. While being exposed practically to the design and deployment of strong web applications, I could familiarize myself with the development of efficient and scalable solutions.</p>
          </div>
          <img className={styles.image} src={rexImage} alt="Rex Rony Jacob" />
        </div>
        <ul className={styles.skills}>
          <li className={styles.skill1}>
              <b>Front-end</b>
              <p>JavaScript / HTML / CSS / React / Bootstrap</p>
          </li>
          <li className={styles.skill2}>
              <b>Back-end</b>
              <p>Java / SpringBoot / MySql / Microservices / Swift iOS</p>
          </li>
          <li className={styles.skill3}>
              <b>Testing</b>
              <p>Selenium (Java) / REST API / Karate </p>
          </li>
          <li className={styles.skill4}>
              <b>Other Skills</b>
              <p>Adobe Photoshop / Adobe After Effects / Apple Final Cut Pro X / Cinematography / Photography </p>
          </li>
        </ul>
      </div>
    </section>
  );
};