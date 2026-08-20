import { useState } from "react";

import Window from "../Window/Window";
import ProjectDetails from "./ProjectsDetails";
import { projectData } from "../../data/projectData";

import styles from "./ProjectsWindow.module.css";

const ProjectsWindow = ({ 
    preview = false,

    onClose, 
    onMinimize,
    onMaximize, 

    minimized,
    maximized,

    onFocus, 
    onMove,
    
    width,
    height,

    x, 
    y,

    zIndex,
}) => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const activeProject = projectData[activeProjectIndex];

  const showPreviousProject = () => {
    setShowDetails(false);

    setActiveProjectIndex((currentIndex) => {
      if (currentIndex === 0) {
        return projectData.length - 1;
      }

      return currentIndex - 1;
    });
  };

  const showNextProject = () => {
    setShowDetails(false);

    setActiveProjectIndex((currentIndex) => {
      if (currentIndex === projectData.length -1) {
        return 0;
      }

      return currentIndex + 1;
    });
  };

  const openExternalLink = (url) => {
    if (!url) return;

    window.open(
      url,
      "_blank",
      "noopener, noreferrer"
    );
  };

  return (
    <Window
        title="Projects Viewer"
        theme="megabyteTheme"
        titleAlign="left"
        titlePadding={20}

        preview={preview}

        canClose={true}
        canMinimize={true}
        canMaximize={true}

        x={x}
        y={y}

        width={width}
        height={height}

        zIndex={zIndex}

        onClose={onClose}
        onMinimize={onMinimize}
        onMaximize={onMaximize}

        minimized={minimized}
        maximized={maximized}

        onFocus={onFocus}
        onMove={onMove}

        contentSurface={false}
    >

        <div className={styles.projectViewer}>
          <div className={styles.viewerStage}>
            <button
              type="button"
              className={styles.navigationButton}
              onClick={showPreviousProject}
              aria-label="Show previous project"
            >
              <span className={styles.navigationGlyph}>
                ‹
              </span>
            </button>

            <article className={styles.projectCard}>
              <div className={styles.projectImageArea}>
                {activeProject.previewVideo ? (
                  <video
                    src={activeProject.previewVideo}
                    className={styles.projectVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : activeProject.image ? (
                  <img
                    src={activeProject.image}
                    alt={`${activeProject.title} preview`}
                    className={styles.projectImage}
                  />
                ) : (
                  <div className={styles.imagePlaceholder}>
                    <span className={styles.projectTitle}>
                      Project preview coming soon!
                    </span>
                  </div>
                )}
              </div>

              <div className={styles.projectContent}>
                <div className={styles.projectHeading}>
                  <div>
                    <h2 className={styles.projectTitle}>
                      {activeProject.title}
                    </h2>

                    <p className={styles.projectCounter}>
                      Project {activeProjectIndex + 1} of {""}
                      {projectData.length}
                    </p>

                    <div className={styles.progressGroup}>
                      <div className={styles.progressTrack}>
                        <div
                          className={styles.progressFill}
                          style={{
                            width: `${activeProject.progress}%`,
                          }}
                        />
                      </div>

                      <span className={styles.progressLabel}>
                        {activeProject.progress}% complete
                      </span>
                    </div>
                  </div>

                  <span className={styles.projectStatus}>
                    {activeProject.status}
                  </span>
                </div>

                <p className={styles.projectDescription}>
                  {activeProject.description}
                </p>

                <section className={styles.projectSection}>
                  <h3>Technologies</h3>

                  <div className={styles.technologyList}>
                    {activeProject.technologies.map(
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

                {activeProject.completedFeatures?.length > 0 && (
                  <section className={styles.projectSection}>
                    <h3>Completed</h3>

                    <ul className={styles.featureList}>
                      {activeProject.completedFeatures.map((feature) => (
                        <li key={feature}>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {activeProject.plannedFeatures?.length > 0 && (
                  <section className={styles.projectSection}>
                    <h3>Roadmap</h3>

                    <ul className={styles.featureList}>
                      {activeProject.plannedFeatures.map((feature) => (
                        <li key={feature}>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                <div className={styles.projectActions}>
                    <button
                      type="button"
                      className={styles.actionButton}
                      onClick={() => setShowDetails(true)}
                    >
                      Details
                    </button>

                  <button
                    type="button"
                    className={styles.actionButton}
                    onClick={() =>
                      openExternalLink(
                        activeProject.repositoryUrl
                      )
                    }
                    disabled={!activeProject.repositoryUrl}
                    title={
                      activeProject.repositoryUrl
                      ? "Open project repository"
                      : "Repository Coming Soon"
                    }
                  >
                    {activeProject.repositoryUrl
                      ? "Repository"
                      : "Repository Coming Soon"}
                  </button>

                  {activeProject.demoUrl && (
                    <button
                      type="button"
                      className={styles.actionButton}
                      onClick={() =>
                        openExternalLink(activeProject.demoUrl)
                      }
                    >
                      Live Demo
                    </button>
                  )}
                </div>

                {activeProject.status !== "Completed" && (
                  <p className={styles.developmentNotice}>
                    This project is part of the active portfolio roadmap. Links will become available as development milestones are completed.
                  </p>
                )}
              </div>
            </article>

            <button
              type="button"
              className={styles.navigationButton}
              onClick={showNextProject}
              aria-label="Show next project"
            >
              <span className={styles.navigationGlyph}>
                › 
              </span>
            </button>
          </div>

          {showDetails && (
            <ProjectDetails
              project={activeProject}
              onClose={() => setShowDetails(false)}
              onOpenRepository={() =>
                openExternalLink(activeProject.repositoryUrl)
              }
              onOpenDemo={() =>
                openExternalLink(activeProject.demoUrl)
              }
            />
          )}
          
          <footer className={styles.footer}>
            <span>{activeProject.title}</span>
            <span>{activeProject.status}</span>
          </footer>
        </div>
    </Window>
  );
};

export default ProjectsWindow;