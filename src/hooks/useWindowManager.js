import { useState, useEffect } from "react";

import { appRegistry } from "../config/appRegistry";

const MENU_BAR_HEIGHT = 40;
const DESKTOP_WINDOW_MARGIN = 40;
const WINDOW_Z_BASE = 20;
const MOBILE_WINDOW_MARGIN = 8;
const MOBILE_BREAKPOINT = 600;

const isPhoneView = () => {
    return (
        Math.min(
            window.innerWidth,
            window.innerHeight
        ) <= MOBILE_BREAKPOINT
    );
};

const getWindowMargin = () => {
    return isPhoneView()
        ? MOBILE_WINDOW_MARGIN
        : DESKTOP_WINDOW_MARGIN;
};

const shouldMaximizeOnPhone = (type) => {
    const app = appRegistry[type];

    return (
        isPhoneView() &&
        app?.maximizeOnPhone === true
    );
};

export const useWindowManager = () => {
    const [windows, setWindows] = useState([]);
    const [activeWindowType, setActiveWindowType] = useState(null);


    const getWindowDefaults = (type) => {
        const availableWidth = window.innerWidth;
        const availableHeight = window.innerHeight - MENU_BAR_HEIGHT;

        const margin = getWindowMargin();

        const app = appRegistry[type];

        let width = app?.defaultWidth ?? 800;
        let height = app?.defaultHeight ?? 500;

        width = Math.min(width, availableWidth - margin * 2);
        height = Math.min(height, availableHeight - margin * 2);

        return { width, height };
    };

    const getHighestZ = (windowList) => {
        const validZIndexes = windowList
            .map((windowItem) => windowItem.zIndex)
            .filter((zIndex) => Number.isFinite(zIndex));

        return Math.max(
            ...validZIndexes,
            WINDOW_Z_BASE
        );
    };

    const centerWindow = (width, height) => {
        return {
            x: (window.innerWidth - width) / 2,
            y: (window.innerHeight - MENU_BAR_HEIGHT - height) / 2,
        };
    };

    const openWindow = (type, props = {}) => {
        setActiveWindowType(type);
        
        setWindows((prev) => {
        const existingWindow = prev.find(
            (windowItem) => windowItem.type === type
        );

        if (existingWindow) {
            return prev.map((windowItem) => 
                windowItem.id === existingWindow.id
                    ? {
                        ...windowItem,
                        minimized: false,
                        zIndex: getHighestZ(prev) + 1,
                    }
                    : windowItem
            );
        }

        const { width, height } = getWindowDefaults(type);

        const { x, y } = centerWindow(width, height);

        const maximizeOnPhone =
            shouldMaximizeOnPhone(type);

        const initialActiveSection = 
            type === "trash"
                ? "trash"
                : "recents";

        return [
            ...prev,
            {
                id: crypto.randomUUID(),
                type,
                
                props: {
                    activeSection: initialActiveSection,
                    viewMode: "icons",
                    search: "",
                    ...props,
                },

                x: maximizeOnPhone ? 0 : x,
                y: maximizeOnPhone ? 0 : y,

                width: maximizeOnPhone
                    ? window.innerWidth
                    : width,
                height: maximizeOnPhone
                    ? window.innerHeight - MENU_BAR_HEIGHT
                    : height,

                minimized: false,
                maximized: maximizeOnPhone,

                previousBounds: maximizeOnPhone
                    ? {
                        x,
                        y,
                        width,
                        height,
                    }
                    : null,

                zIndex: getHighestZ(prev) + 1,
            },
        ];
    });
};

    const closeWindow = (id) => {
        setWindows((prev) => {
            const closingWindow = prev.find(
                (windowItem) => windowItem.id === id);

            if (closingWindow?.type === activeWindowType) {
                setActiveWindowType(null);
            }
            
            return prev.filter((windowItem) => windowItem.id !== id);
        });
    };    

  const focusWindow = (id) => {
    setWindows((prev) => {
        const focusedWindow = prev.find(
            (windowItem) => windowItem.id === id
        );

        if (focusedWindow && !focusedWindow.minimized) {
            setActiveWindowType(focusedWindow.type);
        }

        const highestZ = getHighestZ(prev);

        return prev.map((windowItem) =>
        windowItem.id === id
            ? {
                ...windowItem,
                zIndex: highestZ + 1,
            }
            : windowItem
        );
    });
};

   const moveWindow = (id, x, y) => {
    setWindows((prev) => 
      prev.map((windowItem) =>
        windowItem.id === id 
          ? {
            ...windowItem, 
            x, 
            y,
          }
          : windowItem
        )
      );   
   };

   const updateWindowProps = (id, updates) => {
    setWindows((currentWindows) =>
        currentWindows.map((windowItem) =>
            windowItem.id === id
                ? {
                    ...windowItem,
                    props: {
                        ...windowItem.props,
                        ...updates,
                    },
                }
                : windowItem
         )
     );
   };

const minimizeWindow = (id) => {
    setWindows((prev) => {
        const minimizingWindow = prev.find(
            (windowItem) => windowItem.id === id
        );

        if (minimizingWindow?.type === activeWindowType) {
            setActiveWindowType(null);
        }

        return prev.map((windowItem) =>
        windowItem.id === id
            ? {
                ...windowItem,
                minimized: true,
            }
            : windowItem
        );
    });
  };

  const restoreWindow = (id) => {
    setWindows((prev) => {
        const restoredWindow = prev.find(
            (windowItem) => windowItem.id === id
        );

        if (restoredWindow) {
            setActiveWindowType(restoredWindow.type);
        }

        const highestZ = getHighestZ(prev);

        return prev.map((windowItem) =>
            windowItem.id === id
                ? {
                    ...windowItem,
                    minimized: false,
                    zIndex: highestZ + 1,
                }
                : windowItem
        );
    });
  };

  const maximizeWindow = (id) => {
    setWindows((prev) =>
      prev.map((windowItem) => {
        if (windowItem.id !== id) return windowItem;

        if (windowItem.maximized) {
            if (isPhoneView()) {
                const { width, height } =
                    getWindowDefaults(windowItem.type);

                    const { x,y } =
                        centerWindow(width, height);

                    return {
                        ...windowItem,

                        maximized: false,

                        x,
                        y,

                        width,
                        height,

                        previousBounds: null,
                    };
                }

                if (!windowItem.previousBounds) {
                    return windowItem;
                }

                return {
                    ...windowItem,

                    maximized: false,

                    x: windowItem.previousBounds.x,
                    y: windowItem.previousBounds.y,

                    width: windowItem.previousBounds.width,
                    height: windowItem.previousBounds.height,

                    previousBounds: null,
                };
            }

        return {
            ...windowItem,

            previousBounds: {
                x: windowItem.x,
                y: windowItem.y,
                width: windowItem.width,
                height: windowItem.height,
            },

            maximized: true,
            minimized: false,

            x: 0,
            y: 0,

            width: window.innerWidth,
            height: window.innerHeight - MENU_BAR_HEIGHT,
        };
      })
    );
  };

 useEffect(() => {
    const handleWindowLayout = () => {

        const availableWidth = window.innerWidth;
        const availableHeight =
            window.innerHeight - MENU_BAR_HEIGHT;

        const margin = getWindowMargin();

        setWindows((currentWindows) =>
            currentWindows.map((windowItem) => {

                if (windowItem.maximized) {
                    return {
                        ...windowItem,

                        x: 0,
                        y: 0,

                        width: availableWidth,
                        height: availableHeight,
                    };
                }

                const app =
                    appRegistry[windowItem.type];

                const preferredWidth =
                    app?.defaultWidth ?? 800;

                const preferredHeight =
                    app?.defaultHeight ?? 500;

                const resizedWidth = Math.min(
                    preferredWidth,
                    availableWidth - margin * 2
                );
                
                const resizedHeight = Math.min(
                    preferredHeight,
                    availableHeight - margin * 2
                );

                return {
                    ...windowItem,

                    width: resizedWidth,
                    height: resizedHeight,

                    x: Math.max(
                        margin, 
                        Math.min(
                            windowItem.x,
                            availableWidth -
                            resizedWidth -
                            margin
                        )
                    ),

                    y: Math.max(
                        margin,
                        Math.min(
                            windowItem.y,
                            availableHeight -
                                resizedHeight -
                                margin
                        )
                    ),
                };
            }))
        }

        window.addEventListener(
            "resize",
            handleWindowLayout
        );

        return () => {
            window.removeEventListener(
                "resize",
                handleWindowLayout
            );
        };
    }, []);
  
  const clearActiveWindow = () => {
    setActiveWindowType(null);
  };

    const activeWindowName = activeWindowType
        ? appRegistry[activeWindowType]?.name || "yemOS"
        : "yemOS";

    const minimizedWindows = windows.filter(
        (windowItem) => windowItem.minimized
    );

    const hasMaximizedWindow = windows.some(
    (window) => window.maximized && !window.minimized
    );

    return {
        windows,
        activeWindowType,
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
    };
};