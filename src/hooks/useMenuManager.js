import { useContext } from "react";

import { MenuManagerContext } from "../context/menuManagerContext";

export const useMenuManager = () => {
    const context = useContext(MenuManagerContext);

    if (!context) {
        throw new Error(
            "useMenuManager must be used inside MenuManagerProvider."
        );
    }

    return context;
};