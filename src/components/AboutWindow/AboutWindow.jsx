import Window from "../Window/Window";
import styles from "./AboutWindow.module.css";

import whiteLogo from "../../assets/logos/white_logo.png";

const AboutWindow = ({ 
    onOpenApp,

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
    const handleMoreInfo = () => {
        onOpenApp?.("resume");
    };

  return (
    <Window
        title="About yemOS"

        titleAlign="left"
        controlsPosition="right"
        contentSurface={false}

        canClose={true}
        canMinimize={false}
        canMaximize={false}

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

        rightControls={
            <div className={styles.controlSpacer} />
        }
    >

        <div className={styles.aboutContent}>

            <img 
                src={whiteLogo}
                alt="yemOS"
                className={styles.logo}
            />

            <h2>yemOS</h2>

            <p className={styles.version}>
                Version 1.0
            </p>

            <div className={styles.specs}>
                <p>Serial Number: YEM-1989-2026</p>
                <p>Memory: 16 GB Unified Memory</p>
                <p>Chip: Silichrome</p>
            </div>

            <button 
                className={styles.moreInfoButton}
                onClick={handleMoreInfo}
            >
                More Info...
            </button>

            <div className={styles.footer}>
                <p>™ © 1989-2026 yemDev</p>
                <p>All rights reserved.</p>
            </div>
        </div>
    </Window>
  );
};

export default AboutWindow