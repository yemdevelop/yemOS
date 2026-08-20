import { useState } from "react";

import Window from "../Window/Window";
import ResumeToolbar from "./ResumeToolbar";
import ResumeDocument from "./ResumeDocument";

import { resumeData } from "../../data/resumeData";

import styles from "./ResumeWindow.module.css";

const RESUME_PAGES = [
  {
    id: 1,
    label: "Overview",
  },
  {
    id: 2,
    label: "Experience",
  },
  {
    id: 3,
    label: "Education & Projects"
  },
];

const ResumeWindow = ({ 
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
  const [activePage, setActivePage] = useState(1);

  const resumePdfUrl =
    "resume/Yemelia_Hernandez_Irizarry_Resume.pdf";

  const handleDownload = () => {
    const link = document.createElement("a");

    link.href = resumePdfUrl;
    link.download = "Yemelia_Hernandez_Irizarry_Resume.pdf"

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.open(
      resumePdfUrl,
      "_blank",
      "noopener, noreferrer"
    );
  };

  return (
    <Window
        title="Resume"
        theme="hexTheme"
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

        <div className={styles.resumeApplication}>
            <ResumeToolbar
              onDownload={handleDownload}
              onPrint={handlePrint}
              linkedinUrl={resumeData.contact.linkedin}
              githubUrl={resumeData.contact.github}
            />

            <p className={styles.resumeNotice}>
              The viewer contains an expanded resume. Download or print the concise one-page version for job applications.
            </p>

            <nav 
              className={styles.mobilePageSelector}
              aria-label="Resume pages"
            >
              {RESUME_PAGES.map((page) => (
                <button 
                  key={page.id}
                  type="button"
                  className={`${styles.mobilePageButton} ${
                    activePage === page.id
                    ? styles.mobilePageButtonActive
                    : ""
                  }`}
                  onClick={() => setActivePage(page.id)}
                  aria-current={
                    activePage === page.id  
                      ? "page"
                      : undefined
                  }
                >
                  {page.label}
                </button>
              ))}
            </nav>

            <div className={styles.workspace}>
              <aside 
                className={styles.pageSidebar}
                aria-label="Resume pages"
              >
                <div
                  className={styles.sidebarHeading}
                >
                  Pages
                </div>

                {RESUME_PAGES.map((page) => (
                  <button
                    key={page.id}
                    type="button"
                    className={`${styles.pageThumbnail} ${
                      activePage === page.id
                        ? styles.activeThumbnail
                        : ""
                    }`}
                    onClick={() => setActivePage(page.id)}
                    aria-current={
                      activePage === page.id  
                        ? "page"
                        : undefined
                    }
                  >
                    <div 
                      className={styles.thumbnailPaper}
                      aria-hidden="true"
                    >
                      <ResumeDocument
                        activePage={page.id}
                        resume={resumeData}
                        thumbnail={true}
                      />
                    </div>

                    <span className={styles.thumbnailLabel}>
                      {page.label}
                    </span>
                  </button>
                ))}
              </aside>

              <main className={styles.documentArea}>
                <ResumeDocument
                  activePage={activePage}
                  resume={resumeData}
                />
              </main>
            </div>

            <footer className={styles.statusBar}>
              <span>
                Page {activePage} of {RESUME_PAGES.length}
              </span>

              <span>
                {resumeData.name}
              </span>
            </footer>
        </div>
    </Window>
  );
};

export default ResumeWindow;