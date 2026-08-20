import { useState, useEffect } from "react";
import { useLayout } from "../../hooks/useLayout";

import styles from "./BootScreen.module.css";
import chromeLogo from "../../assets/logos/yemdev_chrome_ph-2.png"

const BOOT_STAGES = {
  BLACK: "black",
  LOGO: "logo",
  PROGRESS: "progress",
};

const BootScreen = ({ goToLogin }) => {

  const { layoutMode } = useLayout();

  const [bootStage, setBootStage] = useState(BOOT_STAGES.BLACK);
  const showLogo = bootStage === BOOT_STAGES.LOGO || bootStage === BOOT_STAGES.PROGRESS;
  const showProgress = bootStage === BOOT_STAGES.PROGRESS;

    useEffect(() => {
      const logoTimer = setTimeout(() => {
        setBootStage(BOOT_STAGES.LOGO);
      }, 1400);
      const progressTimer = setTimeout(() => {
        setBootStage(BOOT_STAGES.PROGRESS);
      },  3000);
      const loginTimer = setTimeout(() => {
        goToLogin();
      }, 7000);
      return () => {
        clearTimeout(logoTimer)
        clearTimeout(progressTimer)
        clearTimeout(loginTimer)
      };
    }, [goToLogin])

  return (
    <div 
      className={styles.bootScreen}
      data-layout={layoutMode}
    >
      <div className={styles.bootContent}>
        {showLogo && (
          <div className={styles.logoSlot}>
            <img  
              src={chromeLogo}
              alt="yemDev Logo"
              className={styles.logo}
            />
          </div>
        )}

        <div className={`${styles.loadingContainer} ${showProgress ? styles.showLoading : ""}`}>
          {showProgress && <div className={styles.loadingBar}></div>}
        </div>

      </div>
    </div>
  )}

export default BootScreen