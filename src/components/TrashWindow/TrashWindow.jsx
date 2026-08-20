import BrowserAppWindow from "../BrowserAppWindow/BrowserAppWindow";

const TrashWindow = ({
    onRequestEmptyTrash,
    onOpenApp,

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
    
    x,
    y,

    width,
    height,

    zIndex,
}) => {

  return (
      <BrowserAppWindow 
            title="Trash"
            defaultSection="trash"

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

export default TrashWindow