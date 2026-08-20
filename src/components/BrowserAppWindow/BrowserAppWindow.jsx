import { useState } from "react";

import FileBrowserWindow from "../FileBrowserWindow/FileBrowserWindow";
import MediaPlayer from "../MediaPlayer/MediaPlayer";

import { SIDEBAR_SECTIONS } from "../../data/sidebarSections";
import { useFileSystem } from "../../hooks/useFileSystem";

const BrowserAppWindow = ({
    title,

    windowState,
    onUpdateWindowState, 

    defaultSection = "recents",

    onOpenApp,
    onOpenItem,
    
    emptyTrashEnabled = false,
    onRequestEmptyTrash,

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
    const [playingItem, setPlayingItem] = useState(null);

    const { allItems, recentItems } = useFileSystem();

    const handleOpenItem = (item) => {
      if (item.type === "video") {
        if (!preview) {
          setPlayingItem(item);
        }

        return;
      }

      if (
        item.type === "application" ||
        item.type === "document"
      ) {
        onOpenApp?.(item.id);
        return;
      }

      onOpenItem?.(item);
    };

  return (
    <>
      <FileBrowserWindow 
            title={title}

            items={allItems}
            recentItems={recentItems}
            sidebarSections={SIDEBAR_SECTIONS}

            activeSection={
              windowState?.activeSection ?? defaultSection
            }

            viewMode={
              windowState?.viewMode ?? "icons"
            }

            search={
              windowState?.search ?? ""
            }

            onChangeActiveSection={(activeSection) =>
              onUpdateWindowState?.({
                activeSection,
              })
            }

            onChangeViewMode={(viewMode) =>
              onUpdateWindowState?.({
                viewMode,
              })
            }

            onChangeSearch={(search) =>
              onUpdateWindowState?.({
                search,
              })
            }

            onOpenItem={handleOpenItem}
            
            emptyTrashEnabled={emptyTrashEnabled}
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

        {playingItem && !preview && (
          <MediaPlayer
            item={playingItem}
            onClose={() => setPlayingItem(null)}
          />
        )}
    </>
  );
};

export default BrowserAppWindow