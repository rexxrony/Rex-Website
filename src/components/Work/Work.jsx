import React from 'react';
import styles from './Work.module.css';

export const Work = () => {
  return (
    <section className={styles.container}>
        <div className={styles.contents}>
            <h2 className={styles.title}>Work Experience</h2>
            <hr className={styles.line}/>
            <div className={styles['years-exp-container']}>
                <div className={styles.topRow}>
                    <div className={styles.year1}>2022-2024</div>
                    <div className={styles['company-domain']}>
                        <div className={styles.company}>Infosys Limited</div>
                        <div className={styles.domain}>Systems Engineer</div>
                    </div>
                </div>
                <div className={styles.year2}>2 years</div>
            </div>
            <hr className={styles.line}/>
        </div>
    </section>
  );
};
