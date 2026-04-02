import rexImage from '../../assets/rex.jpg'
import AnimatedContent from '../AnimatedContent/AnimatedContent'
import TiltedCard from '../TiltedCard/TiltedCard'
import { TextReveal } from '../ui/TextReveal'
import styles from './About.module.css'
import aboutData from '../Datas/about.json'

export const About = () => {
  return (
    <section id="about" className={styles.container}>
      <div className={styles.contents}>
        <h2 className={styles.title}>../About Me</h2>
        <div className={styles.flexContainer}>
          <div className={styles.textContent}>
            <p className={styles.intro}>
              <TextReveal duration={0.34} stagger={10} threshold={0.06}>
                {aboutData.intro}
              </TextReveal>
            </p>
            <p className={styles.introSmall}>
              <TextReveal duration={0.3} stagger={9} threshold={0.06}>
                {aboutData.introSmall}
              </TextReveal>
            </p>
          </div>
          <div className={styles.imageWrap}>
            <TiltedCard
              imageSrc={rexImage}
              altText="Rex Rony Jacob"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={12}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={false}
            />
          </div>
        </div>
        <ul className={styles.skills}>
          {aboutData.skills.map((skill, idx) => (
            <AnimatedContent
              key={`${skill.title}-${idx}`}
              distance={80}
              direction="vertical"
              duration={0.8}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={0.96}
              threshold={0.1}
              delay={idx * 0.08}
            >
              <li className={styles.skillCard}>
                <b>{skill.title}</b>
                <p>{skill.description}</p>
              </li>
            </AnimatedContent>
          ))}
        </ul>
      </div>
    </section>
  )
}
