import { useMemo, useState } from "react";

import Window from "../Window/Window";
import FileIcon from "../FileIcon/FileIcon";

import { useFileSystem } from "../../hooks/useFileSystem";

import styles from  "./SearchWindow.module.css";

const SearchWindow = ({
  preview = false,

  onOpenItem,

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
  const { allItems } = useFileSystem();

  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const normalizedSearch = 
    search.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedSearch) {
      return [];
    }

  return allItems.filter((item) => {
    const itemName =
      item.name?.toLowerCase() || "";

    const itemType =
      item.type?.toLowerCase() || "";

    const isTrashItem =
      item.parent === "trash";

    const isHiddenFromSearch =
      item.id === "trash" ||
      item.id === "about";

      return (
        !isTrashItem &&
        !isHiddenFromSearch &&
        (
          itemName.includes(normalizedSearch) ||
          itemType.includes(normalizedSearch)
        )
      );
    });
  }, [allItems, normalizedSearch]);

  const openResult = (item) => {
    if (!item) return;

    onOpenItem?.(item);
  };

  const handleKeyDown = (e) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();

      setSelectedIndex((currentIndex) => {
        if (currentIndex === results.length - 1) {
          return 0;
        }

        return currentIndex + 1;
      });

      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      setSelectedIndex((currentIndex) => {
        if (currentIndex === 0) {
          return results.length - 1;
        }

        return currentIndex - 1;
      });

      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();

      openResult(results[selectedIndex]);
    }
  };

  return (
    <Window
      title="Search"
      titleAlign="left"
      titlePadding={20}

      preview={preview}

      canClose={true}
      canMinimize={true}
      canMaximize={true}

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

      contentSurface={false}
    >
      <div 
        className={styles.searchWindow}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.searchHeader}>
          <input
            className={styles.searchInput}
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            onMouseDown={(e) =>
              e.stopPropagation()
            }
            placeholder="Search yemOS..."
            aria-label="Search yemOS"
            aria-controls="search-results"
            autoFocus
          />
        </div>

        <div 
          id="search-results"
          className={styles.results}
          aria-live="polite"
        >
          {!normalizedSearch && (
            <p className={styles.message}>
              Search for applications and documents.
            </p>
          )}

          {normalizedSearch &&
            results.length === 0 && (
              <p className={styles.message}>
                No results found for "{search.trim()}".
              </p>
            )}

          {results.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.resultItem} ${
                selectedIndex === index
                  ? styles.selectedResult
                  : ""
              }`}
              aria-pressed={selectedIndex === index}
              aria-lable={`${item.name}, ${item.type}`}
              onMouseEnter={() =>
                setSelectedIndex(index)
              }
              onFocus={() =>
                setSelectedIndex(index)
              }
              onClick={() =>
                openResult(item)
              }
            >
              <div className={styles.resultIcon}>
                <FileIcon item={item} />
              </div>

              <div className={styles.resultText}>
                <span className={styles.resultName}>
                  {item.name}
                </span>

                <span className={styles.resultType}>
                  {item.type}
                </span>
              </div>
            </button>
          ))}
        </div>

        <footer
          className={styles.footer}
        >
          {results.length === 1
            ? "1 result"
            : `${results.length} results`}
        </footer>
      </div>
    </Window>
  );
};

export default SearchWindow;