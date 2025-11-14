import React from 'react';
import rexImage from '../../assets/rex.jpg';
import styles from './About.module.css';
import aboutData from '../Datas/about.json';

export const About = () => {
  const skillClasses = ['skill1', 'skill2', 'skill3', 'skill4'];

  return (
    <section id="about" className={styles.container}>
      <div className={styles.contents}>
        <h2 className={styles.title}>../About Me</h2>
        <div className={styles.flexContainer}>
          <div className={styles.textContent}>
            <p className={styles.intro}>
              {aboutData.intro.split('\n').map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  {idx < aboutData.intro.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
            <p className={styles.introSmall}>{aboutData.introSmall}</p>
          </div>
          <img className={styles.image} src={rexImage} alt="Rex Rony Jacob" />
        </div>
        <ul className={styles.skills}>
          {aboutData.skills.map((skill, idx) => (
            <li key={idx} className={styles[skillClasses[idx]]}>
              <b>{skill.title}</b>
              <p>{skill.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};