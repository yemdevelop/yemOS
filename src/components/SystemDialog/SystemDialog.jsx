import { useEffect, useRef } from "react";
import styles from "./SystemDialog.module.css";

const SystemDialog = ({
    dialog, 
    onConfirm,
    onCancel,
}) => {
    const dialogRef = useRef(null);
    const cancelButtonRef = useRef(null);
    const previousFocusRef = useRef(null);

    useEffect(() => {
        if (!dialog) return;

        previousFocusRef.current = document.activeElement;

    if (cancelButtonRef.current) {
        cancelButtonRef.current?.focus();
    } else {
        dialogRef.current
            ?.querySelector("button")
            ?.focus();
    }
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onCancel?.();
                return;
            }

            if (event.key !== "Tab") return;

            const dialogElement = dialogRef.current;

            if (!dialogElement) return;

            const focusableElements =
                dialogElement.querySelectorAll(
                    `button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1])`
                );

            if (focusableElements.length === 0) return;

            const firstElement = focusableElements[0];
            const lastElement =
                focusableElements[focusableElements.length - 1];

            if (
                event.shiftKey &&
                document.activeElement === firstElement
            ) {
                event.preventDefault();
                lastElement.focus();
            }

            if (
                !event.shiftKey &&
                document.activeElement === lastElement
            ) {
                event.preventDefault();
                firstElement.focus();
            }
        };

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );

            previousFocusRef.current?.focus?.();
        };
    }, [dialog, onCancel]);

    if (!dialog) return null;

  return (
    <div
        className={styles.overlay}
        role="presentation"
        onPointerDown={(e) => {
            if (e.target === e.currentTarget) {
                onCancel?.();
            }
        }}
    >
        <section
            ref={dialogRef}
            className={styles.dialog}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="system-dialog-title"
            aria-describedby="system-dialog-message"
        >
            <header className={styles.header}>
                <h2
                    id="system-dialog-title"
                    className={styles.title}
                >
                    {dialog.title}
                </h2>
            </header>

            <div className={styles.content}>
                <p
                    id="system-dialog-message"
                    className={styles.message}
                >
                    {dialog.message}
                </p>
            </div>

            <footer className={styles.actions}>

            {dialog.cancelLabel && (
                <button
                    ref={cancelButtonRef}
                    type="button"
                    className={`${styles.button} ${styles.cancelButton}`}
                    onClick={onCancel}
                >
                    {dialog.cancelLabel}
                </button>
            )}

                <button
                    type="button"
                    className={` 
                        ${styles.button}
                        ${
                            dialog.danger
                                ? styles.dangerButton
                                : styles.confirmButton
                        }
                        
                    `}
                    onClick={onConfirm}
                    >
                        {dialog.confirmLabel}
                </button>
            </footer>
        </section>
    </div>
  );
};

export default SystemDialog