import { useEffect, useMemo, useState } from "react";

import { LayoutContext } from "../context/layoutContext";

const PHONE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1100;

function getLayoutMode() {
    const width = window.innerWidth;

    if (width < PHONE_BREAKPOINT) {
        return "phone";
    }

    if (width < TABLET_BREAKPOINT) {
        return "tablet";
    }

    return "desktop";
}

export function LayoutProvider({ children }) {
    const [layoutMode, setLayoutMode] = useState(getLayoutMode);

    useEffect(() => {
        const handleResize = () => {
            setLayoutMode(getLayoutMode());
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const value = useMemo(() => ({
        layoutMode,
        isPhone: layoutMode === "phone",
        isTablet: layoutMode === "tablet",
        isDesktop: layoutMode === "desktop",
    }), [layoutMode]);

    return (
        <LayoutContext.Provider value={value}>
            {children}
        </LayoutContext.Provider>
    );
}