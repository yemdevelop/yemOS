export const SIDEBAR_SECTIONS = [
    {
        id: "applications",
        label: "Applications",
        group: "favorites",
        filter: (item) => item.type === "application",
    },
    {
        id: "documents",
        label: "Documents",
        group: "favorites",
        filter: (item) => item.type === "document",
    },
    {
        id: "desktop",
        label: "Desktop",
        group: "favorites",
        filter: (item) => item.desktop === true,
    },
    {
        id: "trash",
        label: "Trash",
        group: "locations",
        filter: (item) => item.parent === "trash",
    },
]