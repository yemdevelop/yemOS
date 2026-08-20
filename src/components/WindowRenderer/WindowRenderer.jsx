import AboutWindow from "../AboutWindow/AboutWindow";
import DirectoryWindow from "../DirectoryWindow/DirectoryWindow";
import TrashWindow from "../TrashWindow/TrashWindow";
import ProjectsWindow from "../ProjectsWindow/ProjectsWindow";
import ContactWindow from "../ContactWindow/ContactWindow";
import ResumeWindow from "../ResumeWindow/ResumeWindow";
import SearchWindow from "../SearchWindow/SearchWindow";

const windowComponents = {
    about: AboutWindow,
    projects: ProjectsWindow,
    contact: ContactWindow,
    resume: ResumeWindow,
};

const WindowRenderer = ({
    windowItem,

    onClose,
    onMinimize,
    onMaximize,
    onFocus,
    onMove,
    onUpdateWindowProps,

    onOpenApp,
    onRequestEmptyTrash,
}) => {
    const sharedWindowProps = {
        x: windowItem.x,
        y: windowItem.y,

        width: windowItem.width,
        height: windowItem.height,

        zIndex: windowItem.zIndex,

        minimized: windowItem.minimized,
        maximized: windowItem.maximized,

        onClose: () => onClose(windowItem.id),
        onMinimize: () => onMinimize(windowItem.id),
        onMaximize: () => onMaximize(windowItem.id),
        onFocus: () => onFocus(windowItem.id),
        onMove: (x, y) => onMove(windowItem.id, x, y),
    };

    if (windowItem.type === "directory") {
        return (
            <DirectoryWindow
                {...sharedWindowProps}

                windowState={windowItem.props}

                onUpdateWindowState={(updates) =>
                    onUpdateWindowProps(windowItem.id, updates)
                }

                onOpenApp={onOpenApp}
                onRequestEmptyTrash={onRequestEmptyTrash}
            />
        );
    }

    if (windowItem.type === "trash") {
        return (
            <TrashWindow
                {...sharedWindowProps}

                windowState={windowItem.props}

                onUpdateWindowState={(updates) =>
                    onUpdateWindowProps(
                        windowItem.id,
                        updates
                    )
                }
                
                onOpenApp={onOpenApp}
                onRequestEmptyTrash={onRequestEmptyTrash}
            />
        );
    };

    if (windowItem.type === "search") {
        return (
            <SearchWindow
                {...sharedWindowProps}
                onOpenItem={(item) => {
                    if (
                        item.type === "application" ||
                        item.type === "document"
                    ) {
                        onOpenApp(item.id);
                    }
                }}
            />
        );
    }

    const WindowComponent = windowComponents[windowItem.type];

    if (!WindowComponent) {
       return null; 
    }

    return (
        <WindowComponent 
            {...sharedWindowProps} 
            onOpenApp={onOpenApp}
        />
    
    );
}

export default WindowRenderer;