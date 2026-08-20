import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

import { MenuManagerProvider } from './context/MenuManagerContext.jsx';
import { FileSystemProvider } from "./context/FileSystemContext.jsx";
import { LayoutProvider } from './context/LayoutContext.jsx';

import "./styles/theme.css";

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LayoutProvider>
      <MenuManagerProvider>
        <FileSystemProvider>
            <App />
        </FileSystemProvider>
      </MenuManagerProvider>
    </LayoutProvider>
  </StrictMode>,
)
