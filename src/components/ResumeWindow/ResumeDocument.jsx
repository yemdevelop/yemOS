import styles from "./ResumeWindow.module.css";

const ResumeDocument = ({
    activePage,
    resume,
    thumbnail = false,
}) => {
    const documentContent = (
        <article
            className={`
                ${styles.documentPage}
                ${activePage === 1 ? styles.overviewPage : ""}
                ${thumbnail ? styles.thumbnailDocumentPage : ""}
            `}
        >
            {activePage === 1 && (
                <>
                    <header className={styles.documentHeader}>
                        <h1>
                            {resume.name}
                        </h1>

                        <p className={styles.documentJobTitle}>
                            {resume.title}
                        </p>

                        <div className={styles.documentContact}>
                            <a href={`mailto:${resume.contact.email}`}>
                                {resume.contact.email}
                            </a>

                            <a
                                href={resume.contact.github}
                                target="_blank"
                                rel="noreferrer"
                            >
                                GitHub
                            </a>

                            <a
                                href={resume.contact.linkedin}
                                target="_blank"
                                rel="noreferrer"
                            >
                                LinkedIn
                            </a>   
                        </div>
                    </header>

                    <section className={styles.documentSection}>
                        <h2>Professional</h2>

                        <p>
                            {resume.summary}
                        </p>
                    </section>

                    <section className={styles.documentSection}>
                        <h2>
                            Technical Skills
                        </h2>

                        <div className={styles.documentSkillList}>
                            {(resume.skills || []).map((skill) => (
                                <span
                                    key={skill}
                                    className={styles.documentSkill}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                </>
            )}

            {activePage === 2 && (
                <>
                    <header className={styles.pageHeader}>
                        <h2>
                            Professional Experience
                        </h2>
                    </header>

                    <div className={styles.documentEntryList}>
                        {(resume.experience || []).map((entry) => (
                            <section
                                key={entry.id}
                                className={styles.documentEntry}
                            >
                                <div className={styles.documentEntryHeader}>
                                    <div>
                                        <h3>
                                            {entry.role}
                                        </h3>

                                        <p className={styles.documentOrganization}>
                                            {entry.organization}
                                        </p>
                                    </div>

                                    <span className={styles.documentDates}>
                                        {entry.dates}
                                    </span>
                                </div>

                                <ul className={styles.documentDetailList}>
                                    {(entry.details || []).map((detail) => (
                                        <li key={detail}>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}
                    </div>
                </>
            )}

            {activePage === 3 && (
                <>
                    <header className={styles.pageHeader}>
                        <h2>
                            Education
                        </h2>
                    </header>

                    <div className={styles.documentEntryList}>
                        {(resume.education || []).map((entry) => (
                            <section
                                key={entry.id}
                                className={styles.documentEntry}
                            >
                                <div className={styles.documentEntryHeader}>
                                    <div>
                                        <h3>
                                            {entry.credential}
                                        </h3>

                                        <p className={styles.documentOrganization}>
                                            {entry.school}
                                        </p>
                                    </div>
                                    
                                    <span className={styles.documentDates}>
                                        {entry.dates}
                                    </span>
                                </div>

                                <ul className={styles.documentDetailList}>
                                    {(entry.details || []).map((detail) => (
                                        <li key={detail}>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}
                    </div>

                    <header className={styles.pageHeader}>
                        <h2>
                            Software Engineering Projects
                        </h2>
                    </header>

                    <div className={styles.documentEntryList}>
                        {(resume.projects || []).map((project) => (
                            <section
                                key={project.id}
                                className={styles.documentEntry}
                            >
                                <div className={styles.projectHeading}>
                                    <h3>
                                        {project.name}
                                    </h3>

                                    <span className={styles.projectStatus}>
                                        {project.status}
                                    </span>
                                </div>

                                <p className={styles.projectDescription}>
                                    {project.description}
                                </p>

                                <div className={styles.documentTechnologyList}>
                                    {(project.technologies || []).map(
                                        (technology) => (
                                            <span   
                                                key={technology}
                                                className={styles.documentTechnology}
                                            >
                                                {technology}
                                            </span>
                                        )
                                    )}
                                </div>

                                {project.details?.length > 0 && (
                                    <section className={styles.projectSubsection}>
                                        <h4>
                                            Technical Contributions
                                        </h4>
                               
                                    <ul className={styles.documentDetailList}>
                                        {(project.details || []).map((detail) => (
                                            <li key={detail}>
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {project.challenges?.length > 0 && (
                                <section className={styles.projectSubsection}>
                                    <h4>
                                        Engineering Challenges
                                    </h4>

                                    <ul className={styles.documentDetailList}>
                                        {project.challenges.map((challenge) => (
                                            <li key={challenge}>
                                                {challenge}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {project.lessons && (
                                <section className={styles.projectSubsection}>
                                    <h4>
                                        What I Learned
                                    </h4>

                                    <p className={styles.projectDescription}>
                                        {project.lessons}
                                    </p>
                                </section>
                            )}

                            {project.futureImprovements?.length > 0 && (
                                <section className={styles.projectSubsection}>
                                    <h4>
                                        Continued Development
                                    </h4>

                                    <ul className={styles.documentDetailList}>
                                        {project.futureImprovements.map((improvement) => (
                                            <li key={improvement}>
                                                {improvement}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                                )}
                            </section>
                        ))}
                    </div>
                </>
            )}
        </article>              
    );

    if (thumbnail) {
        return (
            <div className={styles.thumbnailScaler}>
                {documentContent}
            </div>
        );
    }

    return (
        <div 
            className={styles.documentViewport}
            tabIndex={0}
            aria-label="Resume document"
        >
            {documentContent}
        </div>
    );
};

export default ResumeDocument