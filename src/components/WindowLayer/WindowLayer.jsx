import WindowRenderer from "../WindowRenderer/WindowRenderer";

const WindowLayer = ({
    windows,
    onClose,
    onMinimize,
    onMaximize,
    onFocus,
    onMove,
    onUpdateWindowProps,
    onOpenApp,
    onRequestEmptyTrash,
}) => {
  return (
    <>
    {windows.map((windowItem) => (
        <WindowRenderer
          key={windowItem.id}
          windowItem={windowItem}
          onClose={onClose}
          onMinimize={onMinimize}
          onMaximize={onMaximize}
          onFocus={onFocus}
          onMove={onMove}
          onUpdateWindowProps={onUpdateWindowProps}
          onOpenApp={onOpenApp}
          onRequestEmptyTrash={onRequestEmptyTrash}
        />
      ))}
    </>
  );
};

export default WindowLayer