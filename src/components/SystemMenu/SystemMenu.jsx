import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const SystemMenu = ({
    position,
    open, 
    triggerRef,
    onClose,
    onAction,
}) => {

    const menuRef = useRef(null);

    const firstItemRef = useRef(null);

    useEffect(() => {
        if (!open) return;

        const handlePointerDown = (e) => {
            const menuEl = menuRef.current;

            if (!menuEl) return;
            
            if (menuEl.contains(e.target)) return;

            onClose();
        };

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
                triggerRef?.current?.focus();
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onClose, triggerRef]);

    useEffect(() => {
        if (!open) return;

        firstItemRef.current?.focus();
    }, [open]);
    
    if (!open || !position) return null;

    return createPortal(
        <div
            ref={menuRef}
            className="osMenu"
            role="menu"
            aria-label="System menu"
            style={{
                top: position.top,
                left: position.left,
         }}
        >
            <button 
                ref={firstItemRef}
                type="button"
                role="menuitem"
                className="osMenuItem"
                onClick={() => onAction("about")}
            >
                About yemOS
            </button>

            <div 
                className="osMenuSeparator"
                role="separator"
            />
            
            <button 
                type="button"
                role="menuitem"
                onClick={() => onAction("sleep")} 
                className="osMenuItem">
                Sleep
            </button>

            <button 
                type="button"
                role="menuitem"
                onClick={() => onAction("restart")} 
                className="osMenuItem">
                Restart
            </button>

            <button 
                type="button"
                role="menuitem"
                onClick={() => onAction("shutdown")} 
                className="osMenuItem">
                Shutdown
            </button>
        </div>, 
        document.body
    );
};

export default SystemMenu