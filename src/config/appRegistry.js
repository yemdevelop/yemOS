import directoryIcon from "../assets/app-icons/directory_app_icon.png";
import projectsIcon from "../assets/app-icons/projects_app_icon.png";
import contactIcon from "../assets/app-icons/contact_app_icon.png";
import resumeIcon from "../assets/app-icons/resume_icon.png";
import searchIcon from "../assets/menu-icons/search_icon.png"


export const appRegistry = {
    directory: {
        id: "directory",

        name: "Directory",

        icon: directoryIcon,
        dynamicIcon: false,

        type: null,
        parent: null,

        defaultWidth: 900,
        defaultHeight: 600,

        desktop: false,
        dock: true,

        maximizeOnPhone: false,
    },

    trash: {
        id: "trash",

        name: "Trash",

        icon: null,
        dynamicIcon: true,

        type: null,
        parent: null,

        defaultWidth: 800,
        defaultHeight: 500,

        desktop: false,
        dock: true,

        maximizeOnPhone: false,
    },

    about: {
        id: "about",

        name: "About",

        icon: null,
        dynamicIcon: false,

        type: null,
        parent: null,

        defaultWidth: 360,
        defaultHeight: 450,

        desktop: false,
        dock: false,

        maximizeOnPhone: false,
    },

    projects: {
        id: "projects",

        name: "Project Viewer",

        icon: projectsIcon,
        dynamicIcon: false,

        type: "application",
        parent: "applications",

        defaultWidth: 800,
        defaultHeight: 520,

        desktop: true,
        dock: false,

        maximizeOnPhone: true,
    },

    contact: {
        id: "contact",

        name: "Contact",

        icon: contactIcon,
        dynamicIcon: false,

        type: "application",
        parent: "applications",

        defaultWidth: 620,
        defaultHeight: 440,

        desktop: true,
        dock: false,

        maximizeOnPhone: true,
    },

    resume: {
        id: "resume",

        name: "Resume",

        icon: resumeIcon,
        dynamicIcon: false,

        type: "document",
        parent: "documents",

        defaultWidth: 760,
        defaultHeight: 560,

        desktop: true,
        dock: false,

        maximizeOnPhone: true,
    },

    search: {
        id: "search",

        name: "Search",

        icon: searchIcon,
        dynamicIcon: false,

        type: null,
        parent: null,

        defaultWidth: 520,
        defaultHeight: 360,

        desktop: false,
        dock: false,

        maximizeOnPhone: false,
    },
};