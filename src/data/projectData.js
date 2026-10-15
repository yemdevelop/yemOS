import yemosPreview from "../assets/project-previews/yemos_preview_1_compressed.mp4";

export const projectData = [
    {
        id: "yemos",

        title: "yemOS Portfolio Environment",
        status: "Completed",
        progress: 100,

        image: null,
        previewVideo: yemosPreview,

        demoUrl: "",
        repositoryUrl: "https://github.com/yemdevelop/yemOS",

        technologies: [
            "React",
            "JavaScript",
            "CSS Modules",
            "Vite",
            "Context API",
            "Custom Hooks",
            "Responsive Design"
        ],

        description:
            "An interactive operating-system-inspired portfolio built in React to present my resume, projects, technical background, and contact information through a desktop-style application environment.",
        
        inspiration:
            "yemOS was inspired by desktop operating systems, especially macOS interface patterns, and by the visual identity of ReBoot. I wanted the portfolio to feel like its own operating system rather than a traditional website, with individual applications that have distinct personalities while still belonging to the same overall design system.",

        challenges: [
            "Defining clear separation of responsibilities as the project grew, especially deciding which behavior belonged inside individual applications and which belonged in shared systems such as the window manager, window renderer, menu manager, and file system.",
            "Designing the rendering architecture for multiple application types while keeping shared window behavior reusable instead of duplicating window logic across components.",
            "Managing React state and re-rendering across interconnected systems. Changes to window state, active applications, menus, responsive layouts, and application-specific state had to update the correct parts of the interface without unintentionally affecting others.",
            "Supporting desktop, phone portrait, and phone landscape layouts while preserving expected window behavior across viewport changes. Rotation introduced additional challenges around maximizing, restoring, minimizing, and recalculating window dimensions.",
            "Adapting a desktop-style interface to smaller screens without simply shrinking the desktop layout, while preserving the visual identity and interaction model of yemOS.",
            "Maintaining consistent shared behavior and styling while allowing applications such as Directory, Search, Contact, Resume, Projects, and the media player to have their own visual identities.",
        ],
        
        completedFeatures: [
            "Boot and login experience",
            "Reusable window-management system",
            "Window opening, closing, focusing, dragging, minimizing, maximizing, and restoring",
            "Responsive window behavior for desktop, phone portrait, and phone landscape",
            "Directory and Trash applications",
            "Shared file-system architecture",
            "Search application",
            "Resume viewer and PDF download",
            "Project viewer",
            "Contact application",
            "Custom video media player",
            "Shared menu and dialog systems",
            "Application-specific visual themes",
            "Dynamic Dock behavior",
        ],

        plannedFeatures: [
            "Improve landscape layouts across applications",
            "Add smoother window and application animations",
            "Expand application content and interactive features",
            "Continue refining visual consistency across yemOS",
            "Add new portfolio projects as they are completed",
        ],
    },

    {
        id: "ecommerce",

        title: "Queer Art Marketplace",
        status: "In Progress",
        progress: 30,

        image: null,
        demoUrl: "",
        repositoryUrl: "https://github.com/yemdevelop/queer-art-marketplace",

        technologies: [
            "React",
            "Vite",
            "Node.js",
            "Express",
            "MongoDB",
            "Mongoose",
            "JWT",
            "bcrypt",
        ],

        description:
            "A full-stack e-commerce marketplace for browsing and buying queer art, supporting queer artists, and promoting local queer events.",

        completedFeatures: [
            "Express and Vite project scaffolding",
            "User signup with bcrypt password hashing",
            "Login with JWT issuance and auth middleware",
            "Artwork listings for digital and physical pieces",
            "Artist-only listing creation and ownership checks",
            "Editing and deleting listings, locked once a piece has sales",
            "Order creation with shipping for physical artwork",
            "Protection against double-selling one-of-a-kind pieces",
        ],

        plannedFeatures: [
            "React storefront and artwork browsing",
            "Artist profiles and dashboards",
            "Shopping cart and checkout with payments",
            "Secure digital artwork downloads",
            "Order history for buyers and artists",
            "Local queer events listings",
        ],
    },

    {
        id: "music-streaming",

        title: "Music Streaming Application",
        status: "Planned",
        progress: 0,

        image: null,
        demoUrl: "",
        repositoryUrl: "",

        technologies: [
            "React",
            "JavaScript",
            "Node.js",
            "REST APIs",
        ],

        description:
            "A planned music-streaming interface combining my software-development and audio-technology backgrounds.",

        completedFeatures: [],

        plannedFeatures: [
            "Track and artist browsing",
            "Music search",
            "Playlist creation",
            "Reusable playback controls",
            "Responsive media interface",
            "Audio API integration"
        ],
    },

    {
        id: "quiz-rpg",

        title: "Quiz RPG",
        status: "Planned",
        progress: 0,

        image: null,
        demoUrl: "",
        repositoryUrl: "",

        technologies: [
            "React",
            "JavaScript",
            "State Management",
            "Game Logic",
        ],

        description:
            "A planned role-playing quiz game that combines educational challenges, character progression, rewards, and interactive storytelling.",

        completedFeatures: [],

        plannedFeatures: [
            "Quiz-based encounters",
            "Character statistics",
            "Experience and progression",
            "Inventory and rewards",
            "Story-driven levels",
            "Saved game progress",
        ],
    },
]