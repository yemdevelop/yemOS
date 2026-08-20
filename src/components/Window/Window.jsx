import { useId, useRef, useState } from "react";
import styles from "./Window.module.css";


const Window = ({
    title,
    theme = "default",

    titleAlign = "center",
    titlePadding = 12,
    controlsPosition = "left",
    canClose = true,
    canMinimize = true,
    canMaximize = true,
    contentSurface = true,
    children,
    preview = false,

    x,
    y,
    zIndex,

    width, 
    height,

    minimized,
    maximized,

    rightControls,

    onClose,
    onFocus,
    onMove,

    onMinimize,
    onMaximize,
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isMinimizing, setIsMinimizing] = useState(false);

    const titleId = useId();

    const dragRef = useRef({
        dragging: false,
        offsetX: 0,
        offsetY: 0,
    });

    const startDrag = (e) => {
        e.preventDefault();

        onFocus?.();

        setIsDragging(true);

        dragRef.current.dragging = true;

        dragRef.current.offsetX = e.clientX - x;
        dragRef.current.offsetY = e.clientY - y;

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", stopDrag);
    };

    const onMouseMove = (e) => {
        if (!dragRef.current.dragging) return;

        const newX = e.clientX - dragRef.current.offsetX;
        const newY = e.clientY - dragRef.current.offsetY;

        onMove?.(newX, newY);
    };

    const stopDrag = () => {
        dragRef.current.dragging = false;

        setIsDragging(false);

        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", stopDrag);
    };

    const handleMinimize = () => {
        if (isMinimizing) return;

        setIsMinimizing(true);

        setTimeout(() => {
            onMinimize?.();
            setIsMinimizing(false);
        }, 180);
    };

    if (minimized) return null;

    const controls = (
        <div 
        className={styles.windowControls}>

            {canClose && (
                <button 
                    type="button"
                    className={`controlButton controlRed ${styles.windowControlButton}`} 
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose?.();
                    }}
                    aria-label={`Close ${title}`}
                >
                    <span aria-hidden="true">
                        ×
                    </span>
                </button>
            )}

            {canMinimize && (
                <button
                type="button" 
                className={`controlButton controlGold ${styles.windowControlButton}`}
                onClick={(e) => {
                    e.stopPropagation();
                    handleMinimize();
                }}
                aria-label={`Minimize ${title}`}
                >
                    <span aria-hidden="true">
                        -
                    </span>
                </button>
            )}

            {canMaximize && ( 
                <button 
                type="button"
                className={`controlButton controlGreen ${styles.windowControlButton}`}
                onClick={(e) => {
                    e.stopPropagation();
                    onMaximize?.();
                }}
                aria-label={
                    maximized   
                        ? `Restore ${title}`
                        : `Maximize ${title}`
                }
                >
                    <span aria-hidden="true">
                        +
                    </span>
                </button>
            )}
        </div>        
    )

  return (
    <div
        className={`
            ${styles.window} 
            ${styles[theme] ?? ""}
            ${preview ? styles.previewWindow : ""}
            ${maximized ? styles.maximizedWindow : ""}
            ${isDragging ? styles.draggingWindow : ""}
            ${isMinimizing ? styles.minimizingWindow : ""}
        `}
        role={preview ? undefined : "dialog"}
        aria-labelledby={preview ? undefined : titleId}
        
        style={{
            left: `${x}px`,
            top: `${y}px`,
            width,
            height,
            zIndex: Number.isFinite(zIndex)
                ? zIndex
                : 20,
            position: preview ? "relative" : "absolute",
        }}
    >
        <div 
            className={styles.titleBar}
            onMouseDown={startDrag}
        >
        {controlsPosition === "left" && controls}

            <div 
                id={preview ? undefined : titleId}
                className={` 
                    ${styles.title}
                    ${titleAlign === "left" ? styles.titleLeft : ""}
                `}
                style={
                    titleAlign === "left"
                        ? { paddingLeft: `${titlePadding}px`}
                        : undefined
                }
            >
                {title} 
            </div>

            {controlsPosition === "right" && controls}

            <div className={styles.rightControls}>
                {rightControls}
            </div> 
        </div>

        <div 
            className={`${styles.content}
            ${contentSurface ? "osContentSurface" : ""}
            `}>
            {children}
        </div>
    </div>
  );
};


export default Window