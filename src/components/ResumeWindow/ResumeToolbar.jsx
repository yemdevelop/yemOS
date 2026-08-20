import styles from "./ResumeWindow.module.css";

const ResumeToolbar = ({
    onDownload,
    onPrint,
    linkedinUrl,
    githubUrl,
}) => {
  return (
    <nav 
        className={styles.toolbar}
        aria-label="Resume actions"
    >
        <button 
            type="button"
            className={styles.toolbarButton}
            onClick={onDownload}
        >
            Download One-Page PDF
        </button>

        <button
            type="button"
            className={styles.toolbarButton}
            onClick={onPrint}
        >
            Print One-Page PDF
        </button>

        <div className={styles.toolbarDivider} />

        <a
            className={styles.toolbarButton}
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open LinkedIn in a new tab"
        >
            LinkedIn
        </a>

        <a
            className={styles.toolbarButton}
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open GitHub in a new tab"
        >
            GitHub
        </a>   
    </nav>
  )
}

export default ResumeToolbar