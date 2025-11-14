import React from 'react';
import styles from './Work.module.css';
import jobs from '../Datas/work.json';

export const Work = () => {
    // helper to calculate duration between two dates and format as "X years Y months"
    const formatDuration = (startStr, endStr) => {
        if (!startStr) return '';
        const makeDate = (s) => {
            if (s === 'Present') return new Date();
            if (/^\d{4}-\d{1,2}$/.test(s)) return new Date(s + '-01');
            if (/^\d{4}$/.test(s)) return new Date(s + '-01-01');
            return new Date(s);
        };

        const start = makeDate(startStr);
        const end = endStr === 'Present' || !endStr ? new Date() : makeDate(endStr);

        // normalize to start of month
        const startYear = start.getFullYear();
        const startMonth = start.getMonth();
        const endYear = end.getFullYear();
        const endMonth = end.getMonth();

        let totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth);
        if (totalMonths < 0) totalMonths = 0;

        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;

        const parts = [];
        if (years > 0) parts.push(`${years} year${years === 1 ? '' : 's'}`);
        if (months > 0) parts.push(`${months} month${months === 1 ? '' : 's'}`);
        if (parts.length === 0) return 'Less than a month';
        return parts.join(' ');
    };

    const displayYear = (dateStr) => {
        if (!dateStr) return '';
        if (dateStr === 'Present') return 'Present';
        // yyyy or yyyy-mm or yyyy-mm-dd
        const m = dateStr.match(/^(\d{4})/);
        return m ? m[1] : dateStr;
    };

    // Jobs are loaded from ../Datas/work.json

    return (
        <section className={styles.container}>
            <div className={styles.contents}>
                <h2 className={styles.title}>Work Experience</h2>
                <hr className={styles.line} />

                {jobs.map((job, idx) => (
                    <div className={styles['years-exp-container']} key={idx}>
                        <div className={styles.topRow}>
                            <div className={styles.leftCol}>
                                <div className={styles.year1}>{displayYear(job.start)}{job.end ? ` - ${displayYear(job.end)}` : ''}</div>
                                <div className={styles.year2}>{formatDuration(job.start, job.end)}</div>
                            </div>

                            <div className={styles.centerCol} />

                            <div className={styles.rightCol}>
                                <div className={styles.company}>{job.company}</div>
                                <div className={styles.domain}>{job.role}</div>
                            </div>
                        </div>
                        <br></br>
                        <hr className={styles.line} />
                    </div>
                ))}
            </div>
        </section>
    );
};
