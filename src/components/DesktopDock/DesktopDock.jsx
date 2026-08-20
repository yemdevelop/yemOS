import { useState } from "react";

import { useLayout } from "../../hooks/useLayout";

import styles from "../../screens/Desktop/Desktop.module.css";

import { appRegistry } from "../../config/appRegistry";

import TrashIcon from "../TrashIcon/TrashIcon";
import rebootIndicator from "../../assets/system-icons/reboot_chrome_icon.png"
import MinimizedWindowRenderer from "../MinimizedWindowRenderer/MinimizedWindowRenderer";

const DesktopDock = ({
    dockVisible,
    minimizedWindows = [],
    openWindows = [],
    onRestoreWindow,
    onOpenApp,
    trashItems,
}) => {
    const { layoutMode } = useLayout();

    const isPhone = layoutMode === "phone";

    const [showExtraApps, setShowExtraApps] = useState(false);
    const [extraPage, setExtraPage] = useState(0);

    const EXTRA_APPS_PER_PAGE = 2;

    const extraPageCount = Math.ceil(
        minimizedWindows.length / EXTRA_APPS_PER_PAGE
    );

    const visibleExtraWindows = minimizedWindows.slice(
        extraPage * EXTRA_APPS_PER_PAGE,
        extraPage * EXTRA_APPS_PER_PAGE + EXTRA_APPS_PER_PAGE
    );

    const hasExtraApps = minimizedWindows.length > 0;

    const showNextExtraPage = () => {
        setExtraPage((currentPage) => {
            return Math.min(
                currentPage + 1,
                extraPageCount - 1
            );
        });
    };

    const showPreviousExtraPage = () => {
        setExtraPage((currentPage) => {
            return Math.max(
                currentPage - 1,
                0
            );
        });
    };

    const dockApps = Object.values(appRegistry).filter((app) => app.dock);

    const standardDockApps = dockApps.filter(
        (app) => app.dynamicIcon !== true
    );

    const trashApp = dockApps.find(
        (app) => app.id === "trash"
    );

    const isAppOpen = (appId) => {
        return openWindows.some(
            (windowItem) => windowItem.type === appId
        );
    };
    
  return (
    <nav 
        className={`${styles.dock} ${dockVisible === true ? styles.fadeIn : styles.hidden
        }`}
        aria-label="Application Dock"
    >
       {isPhone ? (
        <div className={styles.mobileDockContent}>
            {!showExtraApps ? (
                <>
                    <div className={styles.dockSection}>
                        {standardDockApps.map((app) => (
                            <button
                                key={app.id}
                                type="button"
                                className={styles.dockItem}
                                onClick={() => onOpenApp(app.id)}
                                aria-label={
                                    isAppOpen(app.id)
                                        ? `${app.name}, open`
                                        : `Open ${app.name}`
                                }
                            >
                                <div className={styles.tooltip}>
                                    {app.name}
                                </div>

                                <img
                                    src={app.icon}
                                    alt=""
                                    className={styles.dockIcon}
                                />

                                {isAppOpen(app.id) && (
                                    <img    
                                        src={rebootIndicator}
                                        alt=""
                                        className={styles.openAppIndicator}
                                        aria-hidden="true"
                                    />
                                )}
                            </button> 
                        ))}
                    </div>

                    <div className={styles.dockDivider} />

                    {trashApp && (
                        <button
                            type="button"
                            className={styles.dockItem}
                            onClick={() =>
                                onOpenApp(trashApp.id)
                            }
                            aria-label={
                                isAppOpen(trashApp.id)
                                    ? "Trash, open"
                                    : "Open Trash"
                            }
                        >
                            <div 
                                className={styles.tooltip}
                                aria-hidden="true"
                            >
                                {trashApp.name}
                            </div>

                            <TrashIcon
                                items={trashItems}
                                className={styles.dockIcon}
                            />

                            {isAppOpen(trashApp.id) && (
                                <img
                                    src={rebootIndicator}
                                    alt=""
                                    className={styles.openAppIndicator}
                                    aria-hidden="true"
                                />
                            )}
                        </button>
                    )}

                    {hasExtraApps && (
                        <button
                            type="button"
                            className={styles.dockNavigationButton}
                            onClick={() => {
                                setExtraPage(0);
                                setShowExtraApps(true);
                            }}
                            aria-label="Show minimized applications"
                        >
                            <span aria-hidden="true">
                                ﹥
                            </span>
                        </button>
                    )}
                </>
            ) : (
                <>
                    <button
                        type="button"
                        className={styles.dockNavigationButton}
                        onClick={() => {
                            if (extraPage === 0) {
                                setShowExtraApps(false);
                            } else {
                                showPreviousExtraPage();
                            }
                        }}
                        aria-label={
                            extraPage === 0
                            ? "Return to main Dock"
                            : "Show previous application"
                        }   
                    >
                        <span aria-hidden="true">
                            ﹤
                        </span>
                    </button> 

                    <div className={styles.dockSection}>
                        {visibleExtraWindows.map((windowItem) => (
                            <MinimizedWindowRenderer
                                key={windowItem.id}
                                windowItem={windowItem}
                                onRestore={onRestoreWindow}
                                openIndicator={rebootIndicator}
                            />
                        ))}
                    </div>

                    {extraPage < extraPageCount - 1 && (
                        <button
                            type="button"
                            className={styles.dockNavigationButton}
                            onClick={showNextExtraPage}
                            aria-label="Show next applications"
                        >
                            <span aria-hidden="true">
                                ﹥
                            </span>
                        </button>
                    )}
                </>
            )}
        </div>
       ) : (
        <>
            <div className={styles.dockSection}>
                {standardDockApps.map((app) => (
                    <button
                        key={app.id}
                        type="button"
                        className={styles.dockItem}
                        onClick={() => onOpenApp(app.id)}
                        aria-label={
                            isAppOpen(app.id)
                                ? `${app.name}, open`
                                : `Open ${app.name}`
                            }
                    >
                        <div 
                            className={styles.tooltip}
                            aria-hidden="true"
                        >
                            {app.name}
                        </div>

                        <img    
                            src={app.icon}
                            alt=""
                            className={styles.dockIcon}
                        />

                        {isAppOpen(app.id) && (
                            <img
                                src={rebootIndicator}
                                alt=""
                                className={styles.openAppIndicator}
                                aria-hidden="true"
                            />
                        )}    
                    </button>
                ))}

                {minimizedWindows.map((windowItem) => (
                    <MinimizedWindowRenderer
                        key={windowItem.id}
                        windowItem={windowItem}
                        onRestore={onRestoreWindow}
                        openIndicator={rebootIndicator}
                    />
                ))}
            </div>

            <div className={styles.dockDivider} />

            <div className={styles.dockSection}>
                {trashApp && (
                    <button 
                        type="button"
                        className={styles.dockItem}
                        onClick={() => onOpenApp(trashApp.id)}
                        aria-label={
                            isAppOpen(trashApp.id)
                                ? "Trash, open"
                                : "Open Trash"
                        }
                    >
                        <div className={styles.tooltip}>
                            {trashApp.name}
                        </div>

                        <TrashIcon
                            items={trashItems}
                            className={styles.dockIcon}
                        />

                        {isAppOpen(trashApp.id) && (
                            <img
                                src={rebootIndicator}
                                alt=""
                                className={styles.openAppIndicator}
                                aria-hidden="true"
                            />
                        )}
                    </button>
                )}
            </div>
        </>
       )}
    </nav>
  );
};

export default DesktopDock