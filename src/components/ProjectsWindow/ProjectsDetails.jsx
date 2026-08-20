import styles from "./ProjectsWindow.module.css";


const ProjectsDetails = ({
    project,
    onClose,
    onOpenRepository,
    onOpenDemo,
}) => {
    
    if (!project) return null;
    
  return (
    <div className={styles.detailsOverlay}>
        <section className={styles.detailsPanel}>
            <header className={styles.detailsHeader}>
                <div>
                    <h2 className={styles.detailsTitle}>
                        {project.title}
                    </h2>

                    <span className={styles.projectStatus}>
                        {project.status}
                    </span>
                </div>

                <button
                    type="button"
                    className={styles.detailsCloseButton}
                    onClick={onClose}
                    aria-label="Close project details"
                >
                    <span className={styles.closeGlyph}>
                        ×
                    </span>
                </button>
            </header>

            <div className={styles.detailsContent}>
                <section className={styles.detailsSection}>
                    <h3>Description</h3>

                    <p>
                        {project.description}
                    </p>
                </section>

                {project.inspiration && (
                    <section className={styles.detailsSection}>
                        <h3>Inspiration</h3>

                        <p>
                            {project.inspiration}
                        </p>
                    </section>
                )}

                <section className={styles.detailsSection}>
                    <h3>Technology</h3>

                    <div className={styles.technologyList}>
                        {(project.technologies || []).map(
                            (technology) => (
                                <span
                                    key={technology}
                                    className={styles.technology}
                                >
                                    {technology}
                                </span>
                            )
                        )}
                    </div>
                </section>

                {project.challenges?.length > 0 && (
                    <section className={styles.detailsSection}>
                        <h3>Challenges</h3>

                        <ul className={styles.featureList}>
                            {project.challenges.map((challenge) => (
                                <li key={challenge}>
                                    {challenge}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {project.completedFeatures?.length > 0 && (
                    <section className={styles.detailsSection}>
                        <h3>Completed Features</h3>

                        <ul className={styles.featureList}>
                            {project.completedFeatures.map((feature) => (
                                <li key={feature}>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {project.plannedFeatures?.length > 0 && (
                    <section className={styles.detailsSection}>
                        <h3>Roadmap</h3>

                        <ul className={styles.featureList}>
                            {project.plannedFeatures.map((feature) => (
                                <li key={feature}>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {project.details?.length > 0 && (
                    <section className={styles.detailsSection}>
                        <h3>Development Details</h3>

                        <ul className={styles.featureList}>
                            {project.details.map((detail) => (
                                <li key={detail}>
                                    {detail}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>

            <footer className={styles.detailsActions}>
                <button
                    type="button"
                    className={styles.actionButton}
                    onClick={onOpenRepository}
                    disabled={!project.repositoryUrl}
                    title={
                        project.repositoryUrl
                            ? "Open project repository"
                            : "Repository Coming Soon"
                    }
                >
                    {project.repositoryUrl
                        ? "Repository"
                        : "Repository Coming Soon"}
                </button>

                {project.demoUrl && (
                    <button
                        type="button"
                        className={styles.actionButton}
                        onClick={onOpenDemo}
                    >
                        Live Demo
                    </button>
                )}

                <button
                    type="button"
                    className={styles.actionButton}
                    onClick={onClose}
                >
                    Back
                </button>
            </footer>
        </section>
    </div>
  )
}

export default ProjectsDetails