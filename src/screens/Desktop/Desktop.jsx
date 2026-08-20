import { useState, useEffect } from "react";
import styles from "../Desktop/Desktop.module.css";

import emptyTrashSound from "../../assets/sounds/SPLC-6761_FX_Oneshot_Footsteps_Deep_Snow_Footsteps_Crunchy.wav";

import { useWindowManager } from "../../hooks/useWindowManager";
import { useDialogManager } from "../../hooks/useDialogManager";
import { useSoundManager } from "../../hooks/useSoundManager";
import { useLayout } from "../../hooks/useLayout";
import { useMenuManager } from "../../hooks/useMenuManager";
import { useFileSystem } from "../../hooks/useFileSystem";

import { appRegistry } from "../../config/appRegistry";

import DesktopMenuBar from "../../components/DesktopMenuBar/DesktopMenuBar";
import DesktopDock from "../../components/DesktopDock/DesktopDock";
import DesktopIcons from "../../components/DesktopIcons/DesktopIcons";
import WindowLayer from "../../components/WindowLayer/WindowLayer";

import SystemDialog from "../../components/SystemDialog/SystemDialog";

const SYSTEM_MENU_ID = "system-menu";

const Desktop = ({ onPowerAction}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [dockVisible, setDockVisible] = useState(false);
  const [iconsVisible, setIconsVisible] = useState(false);

  const emptyTrash = () => {
    if (trashItems.length === 0) return;

    playSound({
      src: emptyTrashSound,
      volume: 0.4,
    });
    
    clearTrashItems();
  };

  const onRequestEmptyTrash = () => {
    if (trashItems.length === 0) {
      openDialog({
        title: "Trash",
        message: "Trash is already empty.",
        confirmLabel: "OK",
        cancelLabel: null,
      });

      return;
    }

    openDialog({
      title: "Empty Trash",
      message:
        "Are you sure you want to permanently erase the items in Trash?",
        confirmLabel: "Empty Trash",
        cancelLabel: "Cancel",
        danger: true,
        onConfirm: emptyTrash,
    });
  };

  const {
    dialog,
    openDialog,
    confirmDialog,
    cancelDialog,
  } = useDialogManager();

  const {
    trashItems,
    emptyTrash: clearTrashItems,
    markItemAsRecent,
  } = useFileSystem();

  const { playSound } = useSoundManager();

  const { closeMenu } = useMenuManager();

  const {
    windows,
    activeWindowName,
    minimizedWindows,
    hasMaximizedWindow,

    openWindow,
    closeWindow,
    focusWindow,
    moveWindow,
    updateWindowProps,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    clearActiveWindow,
  } = useWindowManager();

  const { layoutMode } = useLayout();

  const handleSystemAction = (action) => {
    closeMenu(SYSTEM_MENU_ID);

    if (action === "about") {
      openWindow("about");
      return;
    }

    if (
      action === "sleep" ||
      action === "restart" ||
      action === "shutdown"
    ) {
      onPowerAction(action);
    }
  }  

  const handleOpenApp = (type, props = {}) => {

    const item = appRegistry[type];

    if (
      item?.type === "application" ||
      item?.type === "document"
    ){
      markItemAsRecent(type);
    }

    openWindow(type, props);
  };
    
  useEffect(() => {
    const t1 = setTimeout(() => setMenuVisible(true), 250);
    const t2 = setTimeout(() => setDockVisible(true), 500);
    const t3 = setTimeout(() => setIconsVisible(true), 800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div 
      className={styles.desktop}
      data-layout={layoutMode}
    >
      
      <DesktopMenuBar 
        menuVisible={menuVisible}
        handleSystemAction={handleSystemAction}
        activeAppName={activeWindowName}
        openSearch={() => openWindow("search")}
      />

      <main 
        className={styles.desktopCanvas}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            clearActiveWindow();
          }
        }}
      >
        <DesktopIcons 
          onOpenApp={handleOpenApp} 
          visible={iconsVisible}
        />

        <WindowLayer 
          windows={windows}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onFocus={focusWindow}
          onMove={moveWindow}
          onUpdateWindowProps={updateWindowProps}
          onOpenApp={handleOpenApp}
          onRequestEmptyTrash={onRequestEmptyTrash}
        />
      </main>

      {!hasMaximizedWindow && (
        <DesktopDock
          dockVisible={dockVisible}
          minimizedWindows={minimizedWindows}
          openWindows={windows}
          onRestoreWindow={restoreWindow}
          onOpenApp={handleOpenApp}
          trashItems={trashItems}
        />
      )}   
      
      <SystemDialog
        dialog={dialog}
        onConfirm={confirmDialog}
        onCancel={cancelDialog}
      />
    </div>
  );
};

export default Desktop