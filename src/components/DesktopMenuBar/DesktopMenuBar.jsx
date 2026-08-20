import { useState, useRef } from "react";

import styles from "../../screens/Desktop/Desktop.module.css";

import chromeLogo from "../../assets/logos/yemDev_chrome_ph-2.png";
import batteryIcon from "../../assets/menu-icons/battery_icon.png";
import wifiIcon from "../../assets/menu-icons/wifi_icon.png";
import searchIcon from "../../assets/menu-icons/search_icon.png";

import { useDateTime } from "../../hooks/useDateTime";

import SystemMenu from "../SystemMenu/SystemMenu";
import { useMenuManager } from "../../hooks/useMenuManager";

const SYSTEM_MENU_ID = "system-menu";

const DesktopMenuBar = ({
    menuVisible,
    handleSystemAction,
    activeAppName,
    openSearch,
}) => {
  const [menuPos, setMenuPos] = useState(null);

  const logoRef = useRef(null);

  const {
    toggleMenu,
    closeMenu,
    isMenuOpen,
  } = useMenuManager();

  const now = useDateTime();

  const weekday = now.toLocaleDateString("en-US", {weekday: "short"});
  const month = now.toLocaleDateString("en-US", {month: "short"});
  const day = now.toLocaleDateString("en-US", {day: "numeric"});

  const formattedDate = `${weekday} ${month} ${day}`;

  const formattedTime = now.toLocaleTimeString("en-US",
    {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

  const openSystemMenu = () => {
    if (!logoRef.current) return;

    const rect =
      logoRef.current.getBoundingClientRect();
    
    setMenuPos({
      top: rect.bottom + 12,
      left: rect.left,
    });

    toggleMenu(SYSTEM_MENU_ID);
  }  

  return (
    <header 
        className={`${styles.menuBar} 
        ${
          menuVisible === true 
            ? styles.fadeIn 
            : styles.hidden
        }`}
    >

        <div className={styles.menuLeft}>
          <button
            ref={logoRef}
            type="button"
            className={styles.logoButton}
            onClick={openSystemMenu}
            aria-label="Open system menu"
            aria-haspopup="menu"
            aria-expanded={isMenuOpen(SYSTEM_MENU_ID)}
          > 
            <img 
              src={chromeLogo}
              alt=""
              className={styles.chromeLogo}
            />
          </button> 

          <SystemMenu
            open={isMenuOpen(SYSTEM_MENU_ID)}
            position={menuPos}
            triggerRef={logoRef}
            onClose={() => closeMenu(SYSTEM_MENU_ID)}
            onAction={handleSystemAction}
          />
            
          <span className={styles.menuLabel}>
            {activeAppName}
          </span>
          
      </div>
        <div className={styles.menuRight}>
          <div className={styles.menuIconSlot}>
              <img 
                src={batteryIcon}
                alt=""
                className={styles.menuIcon}
              />
          </div>  

          <div className={styles.menuIconSlot}>
              <img 
                src={wifiIcon}
                alt=""
                className={styles.menuIcon}
              />
          </div>

          <div className={styles.menuIconSlot}>
              <button 
                type="button"
                className={styles.menuIconButton}
                onClick={openSearch}
                aria-label="Open Search"
              >
                <img 
                  src={searchIcon}
                  alt=""
                  className={styles.menuIcon}
                />
              </button>
          </div>

          <span className={styles.menuLabel}>{formattedDate}</span>
          <span className={styles.menuLabel}>{formattedTime}</span>

        </div>

      </header>
  )
}

export default DesktopMenuBar