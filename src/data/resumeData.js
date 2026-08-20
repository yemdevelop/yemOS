export const resumeData = {
    name: "Yemelia Hernandezirizarry",

    title: "Full-Stack Software Engineer",

    summary:
        "Full-Stack Software Engineer with hands-on experience developing modern web applications using React, JavaScript, Node.js, Express, MongoDB, Python, and Django. Former U.S. Navy Electronics Technician with over 12 years of experience troubleshooting complex systems, supporting secure IT infrastructure, and solving technical problem in high-pressure enviroments. Passionate about creating intuitive, accessible, and visually polished user experiences backed by reliable application architecture.",

    contact: {
        email: "yemdevelop@gmail.com",
        github: "https://github.com/yemdevelop",
        linkedin: "https://www.linkedin.com/in/yemelia-hernandez/",
    },

    skills: [
        "JavaScript (ES6+)",
        "Python",
        "HTML",
        "CSS3",
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Django",
        "Bootstrap",
        "Flexbox",
        "CSS Grid",
        "Responsive Design",
        "REST APIs",
        "Git",
        "GitHub",
        "VS Code",
    ],

    experience: [
        {
            id: "navy-electronics-technician",
            role: "Electronics Technician / Information Systems Support",
            organization: "United States Navy",
            dates: "December 2008 - November 2020",
            details: [
                "Maintained, diagnosed, and repaired mission-critical communications and electronic systems.",
                "Troubleshot complex hardware, software, and connectivity issues while supporting operational readiness.",
                "Administered user permissions and provided technical support for command computer systems.",
                "Loaded cryptographic material and maintained secure communications equipment in accordance with military security procedures.",
                "Performed preventive and corrective maintenance using technical manuals, schematics, diagnostic tools, and established troubleshooting procedures.", 
                "Installed, configured, and maintained computer and communications hardware.",
                "Documented maintenance actions, repairs, system configurations, and technical findings while adhering to strict operational standards.",
                "Collaborated with technical teams to identify equipment failures, restore functionality, and minimize system downtime",
            ],
        },
        {
            id: "audio-engineering",
            role: "Audio Engineering Intern",
            organization: "Various Recording Studios",
            dates: "June 2022 - June 2025",
            details: [
                "Assisted recording engineers during studio tracking, editing, and production sessions.",
                "Configured microphones, signal chains, recording equipment, and audio routing for studio sessions.",
                "Worked with industry-standard digital audio workstations and professional recording equipment.",
                "Troubleshot audio hardware, signal flow. monitoring, and routing issues.",
                "Collaborated with producers, engineers, musicians, and artists in fast-paced production environments.",
                "Supported equipment preparation, session organization, and technical quality control.",
            ],   
        },
    ],

    education: [
        {
            id: "noble-desktop",
            school: "Noble Desktop",
            credential: "Software Engineering Certificate",
            dates: "January 2026 - June 2026",
            details: [
                "Developed responsive web applications using HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, Python, and Django.",
                "Built responsive and accessible user interfaces using Flexbox, CSS Grid, Bootstrap, and modern CSS techniques.",
                "Created reusable React components and worked with state, event handling, conditional rendering, and component-based application architecture.",
                "Developed server-side applications and RESTful APIs using Node.js and Express.",
                "Worked with MongoDB to store, retrieve, and manage application data.",
                "Built Python applications and developed web applications using Django.",
                "Used Git, GitHub, browser developer tools, and industry-standard development workflows.",
                "Completed portfolio development and software engineering career preparation.",
            ],
        },

        {
            id: "tesu",
            school: "Thomas Edison State University",
            credential: "Associate of Science in Electrical Studies",
            dates: "2014 - 2018",
            details: [
                "Studied electrical systems, electronics, circuit analysis, and technical problem-solving.",
                "Strengthened analytical reasoning, troubleshooting, and engineering fundamentals through applied technical coursework"
            ]
        },

        {
            id: "bmcc",
            school: "Borough of Manhattan Community College",
            credential: "Associate of Science in Jazz and Popular Music",
            dates: "August 2023 - May 2025",
            details: [
                "Completed coursework in music theory, performance, composition, and ensemble collaboration.",
                "Developed communication, adaptability, creative problem-solving, and performance skills through individual and group work.",
                "Collaborated with musicians in structured rehearsal and live performance environments.",
            ],
        },
        {
            id: "sae",
            school: "SAE Institute",
            credential: "Audio Technology",
            dates: "August 2021 - May 2022",
            details: [
                "Learned professional audio production workflows using industry-standard digital audio workstations.",
                "Configured microphones, recording systems, live audio equipment, and signal routing.",
                "Studied audio synchronization, recording techniques, signal flow, and music theory fundamentals.",
                "Developed technical troubleshooting skills while preparing and supporting recording sessions.",
            ],
        },
    ],

    projects: [
        {
            id: "yemos",
            name: "yemOS Portfolio Environment",
            status: "Completed",
            technologies: [
                "React",
                "JavaScript",
                "CSS Modules",
                "Vite",
                "Context API",
                "Custom Hooks",
                "Responsive Design",
                "Component-Based Architecture"
            ],
            description:
                "Designed and developed yemOS, an interactive operating-system-inspired portfolio envirnment with React. The project combines front-end engineeringm responsive interface design, application state management, reusable component architecture, and custom system-style interactions to present professional experience, projects, education, and contact information through a desktop-style application environment.",

            details: [
                "Designed and built a complete desktop-style interface including a boot sequence, login screen, menu bar, wallpaper, Dock, application icons, draggable windows, system menus, confirmation dialogs, and multiple custom applications.",
                "Created a reusable window-management architecture responsible for opening, closing, focusing, dragging, minimizing, maximizing, restoring, and rendering applications while maintaining consistent behavior across the system.",
                "Separated shared window behavior from individual application responsibilities through dedicated window-management, window-layer, and window-rendering components, improving maintainability as the number of applications increased.",
                "Developed shared systems for menus, dialogs, sound, file-system data, application confirmation, layout state, and window state so common behavior could be managed centrally instead of duplicated across individual components.",
                "Built custom applications including Directory, Trash, Search, Resume, Projects, Contact, About, and a custom video media player while allowing each application to maintain its own visual identity and application-specific behavior.",
                "Created a Finder-inspired Directory application with reusable icon and list views, file-system-style navigation, recent-item behavior, contexual interactionsm and integration with other yemOS applications.",
                "Implemented custom Trash functionality including stored trash items, empty-trash behavior, confirmation dialogs, protected system-item behavior, and integration with Directory and other file-system interactions.",
                "Developed a Search application that filters application and document data, supports keyboard navigation, touch interaction, selected-result state, and controlled exclusions for non-searchable system items.",
                "Created a Resume application with multi-page document rendering, thumbnail navigation, technical skills, professional experience, education, and software engineering project information.",
                "Developed a Projects application with project navigation, complation progress, technology list, project details, development challenges, and looping video previews.",
                "Built a custom media player with video playback, seeking, volume, and mute controls, fullscreen behavior, responsive layouts, custom transport controls, and phone specific presentation",
                "Implemented responsive application behavior for desktop, mobile portrait, and mobile landscape layouts rather than relying only on sclaed-down desktop styling.",
                "Designed responsive window-state behavior so selected applications could automatically maximize on smaller devices while preserving expected application state across viewport and orientation changes.",
                "Used React Context, custom hooks, reusable components, conditional rendering, event handling, and shared data structures to coordinate behavior across interconnected applications.",
                "Created data-driven application and project structures so application metadata resume content, search data, and project information could be updated independently from the components responsible for rendering them.",
                "Developed a custom visual design system using CSS Modules, reusable theme variables, layered gradients, grain textures, responsive sizing, chrome-inspired controls, and application-specific visual themes.",
                "Optimized production assets by resizing oversized raster graphics while preserving visual quality, significantly reducing the size of UI assets before production deployment.",
                "Tested and refined the application across desktop, phone portrait, and phone landscape views, resolving issues involving viewport dimensions, scrolling, fullscreen behavior, state restoration, and component layouts.",
                "Incorperated accessibility considerations including semantic controls, keyboard interactionm descriptive labels, focus states, touch-friendly controls, and responsive interaction patterns throughout the interface.",
            ],

            challenges: [
                "One of the largest challenges was defining clear separation of responsibilities as the project grew. Early features were easier to manage directly inside individual components, but additional applications and shared behaviors required deciding which responibilities belonged inside application components and which belonged in shared managers, context, hooks, renderers, or data structures.",
                "Rendering architecture became increasing important as multiple application types needed to share common window behavior without duplicating logic. Separating window management, window layering, window rendering, and individual application rendering helped create clearer architectural boundaries.",
                "React re-rendering and state ownership were recurring challenges. Changes to active windows, minimized and maximized states, application-specific state, menus, responsive layouts, and viewport orientation needed to update the correct parts of the interface without unintentionally affected unrelated components.",
                "Responsive design required more than shrinking the desktop interface. Phone portrait and landscape views introduced different interaction expections, window states, scrolling behavior, fullscreen media behavior, touch interactions, and layout contraints that had to be handled intentionally.",
                "Preserving window state across orientation changes was particularly challenging because temporary responsive behavior could overwrite the user's previous state. Solving this required distinguishing between a window's underlying state and tempory presentation changes caused by the viewport.",
                "As the  project became more visually detailed. maintaining cinsistent system-widw style while allowing individual applications to have distinct visual identities required balancing reusable theme rules with application-specific CSS.",
                "As responsive CSS grew, overlapping media queriies and multiple overrides sometimes created conflicting layout behavior. Refactoring these rules into clearer portrait and landscape responsibilities improved predictibility and maintainability.", 
            ],

            lessons: [
                "Building yemOS strengthened my understanding of React architecture, state ownership, component responsibility, rendering, reusable systems, and responsive application design.",
                " The project began as a visually focused portfolio concept but eveolved into a larger application system that required shared architecture and centralized state management. Working through window management, application rendering, responsive state preservation, component ownership, and re-rendering gave me practical experience understanding how architectural decisions affect maintainability, extensibility, and user experience as a React application grow.",
                " It also reinforced the importance of iterative development. Several systems had to be reconsidered and refactored after the limitations of earlier approaches became clear, teaching me to recognize when a problem should be solved architecturally rather than by continuing to add component-specific fixes",
            ],

            futureImprovements: [
                "Improve landscape layouts across individual applications.",
                "Expand application content and interactive features.",
                "Add additional portfolio projects as they are completed.",
                "Continue refining visual consistency and interaction polish across yemOS.",
            ],
        },
    ],
};
