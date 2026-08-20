yemOS

yemOS is an interactive portfolio built as a fictional desktop operating system. Rather than presenting projects and professional information through a traditional portfolio layout, yemOS turns the portfolio itself into an explorable interface with applications, windows, menus, a file system, system dislogs, and responsive desktop enviroments.

Built with React and Vite, the project combines front-end development, UI architecture, responsive design, accessibility, and a custom visual system built primarily with CSS.

Features
∙ Interactive boot, login, desktop, sleep, and shutdown experiences
∙ Draggable and resizable application windows
∙ Window focus, minimize, restore, and close behavior
∙ Desktop dock and application launcher
∙ Directory-style file browser
∙ Trash and file-management interactions
∙ Search interface
∙ Project application with media previews
∙ Multi-page Resume application with downloadable and printable resume
∙ Contact application with professional links
∙ Responsive desktop, tablet, and phone layouts
∙ Keyboard-accessible menus, dialogs, windows, and controls
∙ Reduced-motion support
∙ Custom sound and media interactions

Architecture

As yemOS grew, shared behavior was moved into reusable systems rather than being managed independently by individual components.

Major systems include:

    ∙ Window Manager - manages application windows, focus, positioning, resizing, minimizingm restoring, and closing.
    ∙ Menu Manager - coordinates system and contexual menus.
    ∙ Dialog Manager - provides shared system dialog behavior.
    ∙ Sound Manager - centeralizes interface sound behavior.
    ∙ File System - provides a shared source of truth for files, applications, and Trash state.
    ∙ Layout Context - coordinates responsive layout behavior across the interface.
    ∙ App Registry - centralizes application configuration and metadata.

React Context and custom hooks are used to expose shared state and behavior while keeping components focused on their individual responsibilities.

Accessibility

Accessibility was included as part of the application's interaction design.

The project includes:

    ∙ Keyboard navigation for interactive controls
    ∙ Visible :focus-visible states
    ∙ Accessible labels for icon-based controls
    ∙ Dialog and alert-dialog semantics
    ∙ Focus trapping and focus restoration for modal dialogs
    ∙ Keyboard-accessible menus
    ∙ Keyboard activation of minimized windows
    ∙ Keyboard-accessible sleep/wake behavior
    ∙ Appropriate treatment of decorative imagery
    ∙ prefers-reduced-motion support
    ∙ Keyboard-accessible scrolling where necessary

Responsive Design

Although yemOS is inspired by desktop operating systems, it is designed to work across multiple screen sizes.

Layouts and interactions adapt for:

    ∙ Desktop
    ∙ Tablet
    ∙ Phone

Some interface behavior changes intentionally at smaller breakpoints rather than simply shrinking the desktop UI.

Tech Stack

    ∙ React
    ∙ Javascript
    ∙ Vite
    ∙ CSS Module
    ∙ CSS
    ∙ React Module
    ∙ Custom React Hooks
    ∙ ESLint
    ∙ Git/GitHub

Applications

    Directory:

    The priimary file-browser interface for navigation content within yemOS.

    Project Viewer:

    Displays portfolio projects and project information, including optimized media previews.

    Resume:

    Presents resume information through a multi-page document interface and provides access to a downloadable and printable one-page PDF.

    Contact:

    Provides professional contact and social links through an interface designed to fite the yemOS enviroment.

    Search:

    Provides keyboard-accessible searching within the yemOS interface.

    Trash:

    Integrates with the shared file-system state and supports Trash-specific interactions and dialogs

Design

yemOS uses a custom visual system built primarily with CSS, allowing the interface's themes, textures, surfaces, and interactive states to be rendered directly in the browser rather than relying heavily on pre-rendered graphics.

Different parts of the operating system have their own visual themes while remaining part of the same overall interface. These themes are created through reusable CSS techniques including layered linear and radial gradients, prodecural grain textures, transparency, blend modes, shadows, highlights, backdrop effects, and carefully defined color palettes.

Image and media assets are still used where they make sens, such as application icons, artwork, and project previews.

Development

    Install dependencies:

        npm install

    Start the development server:

        npm run dev

    Run ESLint:

        npm run lint

    Create a production build:

        npm run build

Production

The project is built for production with Vite.

A live deployment link will be added here after deplotment.

Author

Yemelia Hernandezirizarry

Full-Stack Software Developer
