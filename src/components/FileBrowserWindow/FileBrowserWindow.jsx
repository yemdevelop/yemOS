import { useRef, useState } from "react";
import styles from "./FileBrowserWindow.module.css";

import Window from "../Window/Window";
import ViewModeMenu from "../ViewModeMenu/ViewModeMenu";
import { useMenuManager } from "../../hooks/useMenuManager";
import FileIcon from "../FileIcon/FileIcon";

import iconView from "../../assets/directory-icons/icon_icon.png";
import listView from "../../assets/directory-icons/list_icon.png";

const FileBrowserWindow = ({
    title = "Window",
    items = [],
    recentItems = [],
    sidebarSections = [],
    
    activeSection = "recents",
    viewMode = "icons",
    search = "",

    onChangeActiveSection,
    onChangeViewMode,
    onChangeSearch,

    onOpenItem,
    onRequestEmptyTrash,
    emptyTrashEnabled = false,

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
        const [contextMenu, setContextMenu] = useState(null);
        const contentRef = useRef(null);

        const viewMenuId = `${title}-view-menu`;
        const contextMenuId = `${title}-context-menu`;

        const {
            openMenu,
            closeMenu,
            toggleMenu,
            isMenuOpen,
        } = useMenuManager();

        const selectSection = (sectionId) => {
            onChangeActiveSection?.(sectionId);

            setContextMenu(null);
            closeMenu(viewMenuId);
            closeMenu(contextMenuId);
        };

        const activeFilter =
            sidebarSections.find(
                (section) => section.id === activeSection
            )?.filter ?? (() => true);

        const sectionItems = 
            activeSection === "recents"
                ? recentItems
                : items.filter(activeFilter);

        const visibleItems = sectionItems.filter((item) =>
            item.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );

        const currentViewIcon =
            viewMode === "icons"
                ? iconView
                : listView;  
        const handleContextMenu = (e) => {
            if (!emptyTrashEnabled) return;
            if (activeSection !== "trash") return;

            e.preventDefault();

            const contentElement = contentRef.current;

            if (!contentElement) return;

            const contentRect = contentElement.getBoundingClientRect();

            closeMenu(viewMenuId);
            openMenu(contextMenuId);

            setContextMenu({
                    x: e.clientX - contentRect.left,
                    y: e.clientY - contentRect.top,
            });
        };     
    
    return (
        <Window
            title={title}
            titleAlign="left"
            titlePadding={20}
            contentSurface={false}

            preview={preview}
            
            canClose={true}
            canMinimize={true}
            canMaximize={true}

            x={x}
            y={y}

            width={width}
            height={height}

            zIndex={zIndex}

            onClose={onClose}
            onMinimize={onMinimize}
            onMaximize={onMaximize}

            minimized={minimized}
            maximized={maximized}

            onFocus={onFocus}
            onMove={onMove}

            rightControls={
                <>
                    <div className={styles.viewMenuContainer}>
                        <button 
                            type="button"
                            className={styles.viewButton}
                            aria-label="Change file view"
                            aria-haspopup="menu"
                            aria-expanded={isMenuOpen(viewMenuId)}
                            onClick={(e) => {
                                e.stopPropagation();

                                setContextMenu(null);
                                closeMenu(contextMenuId);
                                toggleMenu(viewMenuId);
                            }}
                        >
                            <img
                                src={currentViewIcon}
                                alt=""
                                aria-hidden="true"
                                className={styles.viewIcon}
                            />
                        </button>

                        <ViewModeMenu
                            open={isMenuOpen(viewMenuId)}
                            onClose={() => closeMenu(viewMenuId)}
                            onChangeView={onChangeViewMode}
                        />
                          
                    </div>


                    {emptyTrashEnabled && activeSection === "trash" && (
                        <button
                            type="button"
                            className={styles.emptyTrashButton}
                            onClick={(event) => {
                                event.stopPropagation();
                                onRequestEmptyTrash?.();
                            }}
                        >
                            Empty Trash
                        </button>
                    )}

                    <input
                        className={styles.search}
                        type="search"
                        value={search}
                        onChange={(e) => onChangeSearch?.(e.target.value)}
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                        placeholder="Search..."
                        aria-label={`Search ${title}`}
                    />
                </>
            }
        >
            <div className={styles.body}>
            <div className={styles.mainArea}>

                <aside className={styles.sidebar}>

                    <button
                        type="button"
                        className={`${styles.item} ${activeSection === "recents"
                            ? styles.active
                            : ""
                        }`}
                        onClick={()=> selectSection("recents")}
                        aria-current={
                            activeSection === "recents"
                                ? "page"
                                : undefined
                        }
                    >
                        Recents
                    </button>

                    <div className={styles.sectionTitle}>
                        Favorites
                    </div>

                    {sidebarSections
                        .filter((section) => section.group !== "locations")
                        .map(section => (
                            <button    
                                key={section.id}
                                type="button"
                                className={`${styles.item} ${activeSection === section.id
                                    ? styles.active
                                    : ""

                                }`}
                                onClick={() => selectSection(section.id)}
                                aria-current={
                                    activeSection === section.id
                                        ? "page"
                                        : undefined
                        }
                            >
                                {section.label}
                            </button>
                    ))}

                <div className={styles.sectionTitle}>
                        Locations
                    </div>
                
                 {sidebarSections
                        .filter((section) => section.group === "locations")
                        .map(section => (
                            <button    
                                key={section.id}
                                type="button"
                                className={`${styles.item} ${activeSection === section.id
                                    ? styles.active
                                    : ""

                                }`}
                                onClick={() => selectSection(section.id)}
                                aria-current={
                                    activeSection === section.id
                                        ? "page"
                                        : undefined
                                }
                            >
                                {section.label}
                            </button>
                    ))} 
                    
                </aside>
    
                <main 
                    ref={contentRef}
                    className={styles.directoryContent}
                    onContextMenu={handleContextMenu}
                    onClick={() => {
                        setContextMenu(null);
                        closeMenu(contextMenuId)
                    }}
                >

                    {viewMode === "icons" ? (
                        <div className="osIconGrid">
                            {visibleItems.map(item => (
                                <button
                                    key={(item.id)}
                                    type="button"
                                    className="osIconItem"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onOpenItem?.(item);
                                    }}
                                    onContextMenu={handleContextMenu}
                                    aria-label={`Open ${item.name}`}
                                >    
                                    <FileIcon item={item} />

                                    <span>{item.name}</span>
                                </button>
                            ))}

                        </div>
                    ) : (

                        <div className="osList">

                            {visibleItems.map(item => (
                                <button
                                    key={item.id}
                                    type="button"
                                    className="osListRow"
                                    onClick={() => onOpenItem?.(item)}
                                    onContextMenu={handleContextMenu}
                                    aria-label={`Open ${item.name}`}
                                >
                                    <div className="osListItem">
                                        {item.name}
                                    </div>
                                </button>
                            ))}
                            
                        </div>
                    )}

                 {contextMenu && isMenuOpen(contextMenuId) && (
                    <div 
                        className={`osMenu ${styles.contextMenu}`}
                        role="menu"
                        aria-label="Trash options"
                        style={{
                            position: "absolute",
                            top: `${contextMenu.y}px`,
                            left: `${contextMenu.x}px`,
                            zIndex: 999999,
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >     
                        <button 
                            type="button"
                            role="menuitem"
                            className="osMenuItem"
                            onClick={() => {
                                onRequestEmptyTrash?.();

                                setContextMenu(null);
                                closeMenu(contextMenuId);
                            }}
                        >
                            Empty Trash
                        </button>
                    </div>
                )}
                </main>
            </div>
                <div className={styles.footer}>
                        <span>{visibleItems.length} items </span>
                </div>
            </div>
        </Window>
        
       );
};

export default FileBrowserWindow;