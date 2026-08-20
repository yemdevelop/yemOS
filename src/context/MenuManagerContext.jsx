import { useState } from "react";

import { MenuManagerContext } from "./menuManagerContext";

export const MenuManagerProvider = ({ children }) => {
    const [openMenuId, setOpenMenuId] = useState(null);

    const openMenu = (menuId) => {
        setOpenMenuId(menuId);
    };

    const closeMenu = (menuId) => {
        setOpenMenuId((currentMenuId) => {
            if (menuId && currentMenuId !== menuId) {
                return currentMenuId;
            }

            return null;
        });
    };

    const toggleMenu = (menuId) => {
        setOpenMenuId((currentMenuId) =>
            currentMenuId === menuId
                ? null
                : menuId
        );
    };

    const isMenuOpen = (menuId) => {
        return openMenuId === menuId;
    };

    return (
        <MenuManagerContext.Provider
            value={{
                openMenuId,
                openMenu,
                closeMenu,
                toggleMenu,
                isMenuOpen,
            }}
        >
            {children}
        </MenuManagerContext.Provider>
    );
};
