import { useMemo, useState } from "react";

import { FileSystemContext } from "./fileSystemContext";
import { appRegistry } from "../config/appRegistry";

import trashVideo from "../assets/yemDev-video/wow.mp4";

const INITIAL_TRASH_ITEMS = [
    {
        id: "trash-video",
        name: "wow.mp4",
        type: "video",
        parent: "trash",
        icon: null,
        src: trashVideo,
    },
];

export const FileSystemProvider = ({ children }) => {
    const [trashItems, setTrashItems] = useState(INITIAL_TRASH_ITEMS);

    const [recentItemIds, setRecentItemIds] = useState([]);

    const markItemAsRecent = (itemId) => {
            if (!itemId) return;

            setRecentItemIds((currentIds) => {
                const idsWithoutCurrentItem = currentIds.filter(
                    (id) => id !== itemId
                );

                return [
                    itemId,
                    ...idsWithoutCurrentItem,
                ].slice(0, 10);
            });
        };
    const applicationItems = useMemo(() => {
    return Object.values(appRegistry);
    }, []);

    const allItems = useMemo(() => {
        return [
            ...applicationItems,
            ...trashItems,
        ];
    }, [applicationItems, trashItems]);

    const recentItems = useMemo(() => {
        const items = [
            ...applicationItems,
            ...trashItems,
        ];

        return recentItemIds
            .map((id) =>
            items.find((item) => item.id === id)
        )
        .filter(Boolean);
    }, [applicationItems, trashItems, recentItemIds]);

    const emptyTrash = () => {
        setTrashItems([]);
    };

    const addItemToTrash = (item) => {
        if (!item) return;

        setTrashItems((currentTrashItems) => {
            const itemAlreadyExists =
            currentTrashItems.some(
                (trashItem) => trashItem.id === item.id
            );

            if (itemAlreadyExists) {
                return currentTrashItems;
        }

        return [
            ...currentTrashItems,
            {
                ...item,
                parent: "trash",
            },
        ];
     });
    };

    const removeItemFromTrash = (itemId) => {
        setTrashItems((currentTrashItems) =>
            currentTrashItems.filter(
                (item) => item.id !== itemId
            )
        );
    };

    const getItemsByParent = (parent) => {
        return allItems.filter(
            (item) => item.parent === parent
        );
    };

    const value = {
        applicationItems,
        trashItems,
        allItems,
        recentItems,

        emptyTrash,
        addItemToTrash,
        removeItemFromTrash,
        getItemsByParent,
        markItemAsRecent,
    };

    return (
        <FileSystemContext.Provider value={value}>
            {children}
        </FileSystemContext.Provider>
    );
};
