import { useContext } from "react";

import { FileSystemContext } from "../context/fileSystemContext";

export const useFileSystem = () => {
    const context = useContext(FileSystemContext);

    if (!context) {
        throw new Error(
            "useFileSystem must be used inside FileSystemProvider."
        );
    }

    return context;
}