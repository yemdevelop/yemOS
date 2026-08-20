import styles from "../../screens/Desktop/Desktop.module.css";

import { appRegistry } from "../../config/appRegistry";

const DesktopIcons = ({ 
    onOpenApp,
    visible, 
  }) => {
  const desktopApps = Object.values(appRegistry).filter(
    (app) => app.desktop
  );

  return (
    <div className={`${styles.desktopIcons} ${visible ? styles.desktopIconsVisible : styles.desktopIconsHidden
    }`}>
          {desktopApps.map((app) => (
            <button 
            key={app.id}
            className={styles.desktopIcon}
            onClick={() => onOpenApp(app.id)}
         >

          <img
            src={app.icon}
            alt={app.name}
            className={styles.desktopIconImage}
          />

          <span className={styles.desktopIconLabel}>
            {app.name}
          </span>
        </button>
            ))}
    </div>
  );
};

export default DesktopIcons