import AnimatedContent from '../AnimatedContent/AnimatedContent'
import styles from './MyProjects.module.css'
import MyProj from '../Datas/myProj.json'
import { FaGithub } from 'react-icons/fa'


export const MyProjects = () => {
  return (
    <section id="experience" className={styles.background}>
      <br />
      <br />
      <br />
      <br />
      <h2 className={styles.title}>{"</"}Projects Done{">"}</h2>
      <p className={styles.projectss}>
        Welcome to the Projects section of my portfolio. Here, you’ll find a curated selection of my work that highlights my skills, creativity, and dedication to excellence.
        In this section, you’ll discover a variety of projects across different domains, showcasing my versatility and expertise. From sophisticated software applications to engaging web designs, each project reflects my commitment to delivering high-quality results with meticulous attention to detail.
      </p>
      <br />
      <div className={styles.projectsContainer}>
        {MyProj.map((project, index) => (
          <AnimatedContent
            key={index}
            distance={100}
            direction="vertical"
            duration={0.8}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={0.96}
            threshold={0.1}
            delay={index * 0.1}
          >
            <div className={styles.projectCard}>
              <h3 className={styles.projectTitle}>{project.projName}</h3>
              <p className={styles.projectDescription}>{project.projDesc}</p>
              <br />
              <p className={styles.projectSoftware}>{project.software}</p>
              <br />
              <br />
              <a href={project.link} className={styles.projectLink} target="_blank" rel="noreferrer">
                <FaGithub /> Project Link
              </a>
            </div>
          </AnimatedContent>
        ))}
      </div>
      <br />
      <br />
      <br />
      <br />
    </section>
  )
}
