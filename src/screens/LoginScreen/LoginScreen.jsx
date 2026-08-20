import { useState, useEffect, useRef } from "react";
import styles from "./LoginScreen.module.css";

import PowerMenu from "../../components/PowerMenu/PowerMenu";
import { useMenuManager } from "../../hooks/useMenuManager";

import loginAvatar from "../../assets/avatar/login_avatar.png";
import keyboardIcon from "../../assets/menu-icons/keyboard_icon.png";
import batteryIcon from "../../assets/menu-icons/battery_icon.png";
import powerIcon from "../../assets/menu-icons/power_icon.png";
import arrowIcon from "../../assets/arrow-icon/login_arrow_icon.png";

import { useDateTime } from "../../hooks/useDateTime";

const POWER_MENU_ID = "login-power-menu";

const LoginScreen = ({ goToDesktop, onPowerAction, isTransitioning }) => {
  
  const {
    openMenu,
    closeMenu,
    isMenuOpen,
  } = useMenuManager();

  const [menuVisible, setMenuVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const [dotCount, setDotCount] = useState(0);
  const typingComplete = dotCount === 8;
  const showArrow = dotCount > 0;

  const [menuPos, setMenuPos] = useState(null);

  const powerRef = useRef(null);

  const now = useDateTime();

  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });

  const formattedTime = now.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    const t1 = setTimeout(() => {
      setMenuVisible(true);
    }, 250);

    const t2 = setTimeout(() => {
      setContentVisible(true);
    }, 700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        setDotCount((prev) => {
          if (prev >= 7) {
            clearInterval(interval);
            return 8;
          }
          return prev + 1;
        });
      }, 200);
    }, 1200)

    return () => clearTimeout(start);
  }, []);

  const handleLogin = () => {
    if (typingComplete) goToDesktop();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  useEffect(() => {
    if (isTransitioning) {
      closeMenu(POWER_MENU_ID);
    }
  }, [isTransitioning, closeMenu]);

  const openPowerMenu = () => {
    if (!powerRef.current) return;

    const rect = powerRef.current.getBoundingClientRect();


    setMenuPos({
      top: rect.bottom + 14,
      left: rect.right - 95,
    });

    openMenu(POWER_MENU_ID);
  };

  const handlePowerAction = (action) => {
    closeMenu(POWER_MENU_ID);
    onPowerAction(action);
  };

  useEffect(() => {
    const handleViewportChange = () => {
      closeMenu(POWER_MENU_ID);
      setMenuPos(null);
    };

    window.addEventListener(
      "resize",
      handleViewportChange
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleViewportChange
      );
    };
  }, [closeMenu]);

  return (
    <div className={styles.loginScreen}>
      <div className={`${styles.menuBar} ${menuVisible === true ? styles.fadeIn : styles.hidden}`}>
        <div className={styles.keyboardWrapper}>
          <span className={styles.lang}>EN</span>
          <img 
            src={keyboardIcon} 
            alt=""
            className={`${styles.menuIcon} ${styles.keyboardIcon}`}
          />
        </div>
        
        <img 
          src={batteryIcon} 
          alt=""
          className={styles.menuIcon} 
        />

        <button 
          ref={powerRef}
          type="button"
          className={styles.powerButton}
          onMouseEnter={openPowerMenu}
          onClick={openPowerMenu}
          aria-label="Open power options"
          aria-haspopup="menu"
          aria-expanded={isMenuOpen(POWER_MENU_ID)}
        >
          <img 
          src={powerIcon}
          alt="" 
          />
          </button>  
      </div>

      <PowerMenu
      open={isMenuOpen(POWER_MENU_ID)}
      position={menuPos}
      triggerRef={powerRef}
      onClose={() => closeMenu(POWER_MENU_ID)}
      onAction={handlePowerAction}
      />

      <div className={`${styles.contentColumn} ${contentVisible === true ? styles.fadeIn : styles.hidden} ${isTransitioning ? styles.fadeOut : ""}`}>

        <div className={styles.timeSection}>
          <h1 className={styles.time}>
            {formattedTime}
          </h1>

          <p className={styles.date}>
            {formattedDate}
          </p>
      </div>

      <div className={styles.loginSection}>

        <div className={styles.avatarSystem}>
          <div className={styles.avatarOuterRing} />

          <div className={styles.avatarMiddleRing} />

          <div className={styles.avatarInnerGlow} />

          <div className={styles.avatarFrame}>
            <img 
              src={loginAvatar} 
              alt="Profile avatar for yemDev"
              className={styles.loginAvatar} 
            />
          </div>
        </div>
        

        <h2 className={styles.userName}>yemDev</h2>

        <div 
          className={styles.credentialSection}
          onKeyDown={handleKeyDown}
        >
          <div className={styles.passwordContainer}>
            <div 
              className={styles.passwordDisplay}
              aria-hidden="true"
            >
              {"•".repeat(dotCount)}
              <span className={styles.cursor}>|</span>
            </div>

            {showArrow && (
              <button 
                type="button"
                className={styles.arrowButton}
                disabled={!typingComplete}
                onClick={handleLogin}
                aria-label="Log in"
              >
                <img 
                  src={arrowIcon} 
                  alt=""
                  className={styles.arrowIcon} 
                />
              </button>  
            )}
          </div>
          <p 
            className={styles.loginMessage}
            aria-live="polite"
          >
            {typingComplete
              ? "Login ready. Select the arrow to continue."
              : "Preparing login..."
            }
          </p>

        </div>
      </div>
    </div>
  </div>
  );
};

export default LoginScreen

