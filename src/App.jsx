import "./App.css";
import { useEffect, useRef, useState } from "react";

import BootScreen from "./screens/BootScreen/BootScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import Desktop from "./screens/Desktop/Desktop";
import ShutdownScreen from "./screens/ShutdownScreen/ShutdownScreen";

import { useLayout } from "./hooks/useLayout";

import MainframeEnvironment from "./components/MainframeEnvironment/MainframeEnvironment.jsx";

const SCREENS = {
  BOOT: "boot",
  LOGIN: "login",
  DESKTOP: "desktop",
  SHUTDOWN: "shutdown",
};

function App() {

  const { layoutMode } = useLayout();

  const [currentScreen, setCurrentScreen] = useState(SCREENS.BOOT);

  const [isSleeping, setIsSleeping] = useState(false);

  const [sleepReturnScreen, setSleepReturnScreen] = useState(null);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const timeoutRef = useRef(null);
  
  const sleepButtonRef = useRef(null);

  const clearExistingTimeout = () => {
    if (!timeoutRef.current) return;

      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    };

  const goToLogin = () => {
    setCurrentScreen(SCREENS.LOGIN);
  };

  const goToDesktop = () => {
    setCurrentScreen(SCREENS.DESKTOP);
  };

  const handleWake = () => {
    setIsSleeping(false);

    if (sleepReturnScreen) {
      setCurrentScreen(sleepReturnScreen);
    };
  };

  const handleShutdownWake = () => {
    setCurrentScreen(SCREENS.BOOT);
  };

  const handlePowerAction = (action) => {
    clearExistingTimeout();

    if (action === "shutdown") {
      setIsTransitioning(true);

      timeoutRef.current = setTimeout(() => {
        setCurrentScreen(SCREENS.SHUTDOWN);
        setIsTransitioning(false);
      }, 500);

      return;
    }
    
    if (action === "restart") {
      setIsTransitioning(true);

      timeoutRef.current = setTimeout(() => {
        setCurrentScreen(SCREENS.BOOT);
        setIsTransitioning(false);
      }, 500);
      return;
    } 
    
    if (action === "sleep") {
      setSleepReturnScreen(currentScreen);
      setIsSleeping(true);
    }
  };

  useEffect(() => {
    return () => {
      clearExistingTimeout();
    };
  }, []); 

  useEffect(() => {
    if (!isSleeping) return;

    sleepButtonRef.current?.focus();
  }, [isSleeping]);

let screen = null;

if (currentScreen === SCREENS.BOOT) {
  screen = (
    <BootScreen 
      goToLogin={goToLogin}
    />
  ); 
} 
  
if (currentScreen === SCREENS.LOGIN) {
  screen = (
    <LoginScreen
        goToDesktop={goToDesktop}
        onPowerAction={handlePowerAction}
        isTransitioning={isTransitioning}
    />
  );
}

if (currentScreen === SCREENS.DESKTOP) {
  screen = (
    <Desktop
      onPowerAction={handlePowerAction}
    />
  );
}  

if (currentScreen === SCREENS.SHUTDOWN) {
  screen = (
    <ShutdownScreen 
      onShutdownWake={handleShutdownWake} 
    />  
  );
}

const showMainframeEnvironment =
  currentScreen === SCREENS.LOGIN ||
  currentScreen === SCREENS.DESKTOP;

return (
  <div 
    className={`app ${isSleeping ? "dimmed" : ""}`}
    data-layout={layoutMode}
  >

    {showMainframeEnvironment && (
      <MainframeEnvironment />
    )}

    <main 
      className="screenLayer"
      id="main-content"
    >
      {screen}
    </main>
    
    {isSleeping && (
      <button  
        ref={sleepButtonRef}
        type="button"
        className="sleepOverlay"
        onClick={handleWake}
        aria-label="Wake yemOS"
      />  
    )}
  </div>
);
}

export default App
