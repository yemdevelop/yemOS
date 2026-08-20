import MinimizedWindowIcon from "../MinimizedWindowIcon/MinimizedWindowIcon";
import DirectoryWindow from "../DirectoryWindow/DirectoryWindow";
import TrashWindow from "../TrashWindow/TrashWindow";

import { appRegistry } from "../../config/appRegistry";

import styles from "../../screens/Desktop/Desktop.module.css";

const MinimizedWindowRenderer = ({
    windowItem,
    onRestore,
    openIndicator,
}) => {
    const usesWindowPreview =
        windowItem.type === "directory" ||
        windowItem.type === "trash";

    if (usesWindowPreview) {
        return (
            <MinimizedWindowIcon
                onClick={() => onRestore(windowItem.id)}
                ariaLabel={
                    windowItem.type === "trash"
                        ? "Restore Trash"
                        : "Restore Directory"
                }
            >
                {windowItem.type === "trash" ? (
                    <TrashWindow
                        preview={true}

                        windowState={windowItem.props}
                        onUpdateWindowState={() => {}}
                        onOpenApp={() => {}}

                        x={0}
                        y={0}

                        width={windowItem.width}
                        height={windowItem.height}

                        zIndex={0}

                        minimized={false}
                        maximized={false}
                    />
                ) : (
                    <DirectoryWindow
                        preview={true}

                        windowState={windowItem.props}
                        onUpdateWindowState={() => {}}
                        onOpenApp={() => {}}

                        x={0}
                        y={0}

                        width={windowItem.width}
                        height={windowItem.height}

                        zIndex={0}

                        minimized={false}
                        maximized={false}
                    />
                )}
            </MinimizedWindowIcon>
        );
    }

    const matchingApp = appRegistry[windowItem.type];

    const name =
        matchingApp?.name ||
        windowItem.type;

    const icon =
        matchingApp?.icon ||
        null;

  return (
    <button
        type="button"
        className={styles.dockItem}
        onClick={() => onRestore(windowItem.id)}
        aria-label={`Restore ${name}`}
    >
        <div 
            className={styles.tooltip}
            aria-hidden="true"
        >
            {name}
        </div>

        {icon ? (
            <img
                src={icon}
                alt=""
                className={styles.dockIcon}
            />
        ) : (
            <span>
                {name}
            </span>
        )}

        {icon && (
            <img 
                src={openIndicator}
                alt=""
                className={styles.openAppIndicator}
                aria-hidden="true"
            />
        )}
    </button>
  );
};

export default MinimizedWindowRenderer