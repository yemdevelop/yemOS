import { useEffect, useRef } from "react";
import styles from "./ViewModeMenu.module.css";

const ViewModeMenu = ({
    open,
    onClose,
    onChangeView,
}) => {
    const menuRef = useRef(null);

    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (e) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target)
            ) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, onClose]);

    if (!open) return null;

  return (
     <div 
        ref={menuRef}
        className={`osMenu ${styles.viewMenu}`}>
        <button
            className="osMenuItem"
            onClick={() => {
                onChangeView("icons");
                onClose();
            }}
        >
            View as Icons
        </button>                        

        <button
            className="osMenuItem"
                onClick={() => {
                onChangeView("list");
                onClose();
            }}
        >
            View as List
        </button>
    </div>
  );
};

export default ViewModeMenu