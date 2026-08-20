import BrowserAppWindow from "../BrowserAppWindow/BrowserAppWindow";

const DirectoryWindow = ({
    onRequestEmptyTrash,

    windowState,
    onUpdateWindowState,

    preview = false,

    onClose,
    onMinimize,
    onMaximize,

    minimized,
    maximized,

    onFocus,
    onMove,

    onOpenApp,
    
    x,
    y,

    width,
    height,

    zIndex,
}) => {
    
    return (
        <BrowserAppWindow
            title="Directory"
            defaultSection="recents"

            windowState={windowState}
            onUpdateWindowState={onUpdateWindowState}

            onOpenApp={onOpenApp}

            emptyTrashEnabled={true}
            onRequestEmptyTrash={onRequestEmptyTrash}

            preview={preview}

            onClose={onClose}
            onMinimize={onMinimize}
            onMaximize={onMaximize}

            minimized={minimized}
            maximized={maximized}
            
            onFocus={onFocus}
            onMove={onMove}
            
            x={x}
            y={y}

            width={width}
            height={height}
            
            zIndex={zIndex}
        />
    );
};

export default DirectoryWindow;