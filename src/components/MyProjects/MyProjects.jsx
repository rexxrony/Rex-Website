import React from 'react';
import styles from './MyProjects.module.css';
import MyProj from '../Datas/myProj.json';
import { FaGithub } from "react-icons/fa";


export const MyProjects = () => {
  return (
    <section id="experience" className={styles.background}>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h2 className={styles.title}>{"</"}Projects Done{">"}</h2>
      <p className={styles.projectss}>Welcome to the Projects section of my portfolio. Here, you’ll find a curated selection of my work that highlights my skills, creativity, and dedication to excellence.

        In this section, you’ll discover a variety of projects across different domains, showcasing my versatility and expertise. From sophisticated software applications to engaging web designs, each project reflects my commitment to delivering high-quality results with meticulous attention to detail.</p>
      <br></br>
      <div className={styles.projectsContainer}>
        {MyProj.map((project, index) => (
          <div key={index} className={styles.projectCard}>
            {/* <img src={project.img} alt={project.projName} className={styles.projectImage} /> */}
            <h3 className={styles.projectTitle}>{project.projName}</h3>
            <p className={styles.projectDescription}>{project.projDesc}</p>
            <br></br>
            <p className={styles.projectSoftware}>{project.software}</p>
            <br></br>
            <br></br>
            <a href={project.link} className={styles.projectLink} target="_blank">
              <FaGithub /> Project Link</a>
          </div>
        ))}
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </section>
  );
}