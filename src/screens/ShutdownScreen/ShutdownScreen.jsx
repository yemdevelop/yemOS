import { useEffect, useState } from 'react';
import powerIcon from "../../assets/system-icons/shutdown_power_icon.png";
import styles from "./ShutdownScreen.module.css";

export const ShutdownScreen = ({ onShutdownWake }) => {
  const [showIcon, setShowIcon] = useState(false);

  const [poweringOn, setPoweringOn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIcon(true);

    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handlePowerOn = () => {
    if (poweringOn) return;

    setPoweringOn(true);

    setTimeout(() => {
      onShutdownWake();
    }, 250);
  };

  return (
    <div
      className={styles.shutdownScreen}
      onKeyDown={(e) => {
        if (e.key === "Enter" && showIcon) {
          handlePowerOn();
        }
      }}
      tabIndex={0}
    >
      {showIcon && (
        <button 
          className={styles.powerButton}
          onClick={handlePowerOn}
        >
          <img
            src={powerIcon}
            alt="Power Icon"
            className={styles.powerIcon}
          />  
        </button>
      )}

    </div>
  );
};

export default ShutdownScreen;
