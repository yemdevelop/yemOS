const FileIcon = ({ item }) => {
    if (item.type === "video" && item.src) {
        return (
            <video  
                src={item.src}
                className="osVideoThumb"
                preload="metadata"
                muted
                aria-hidden="true"
                onContextMenu={(e) => e.preventDefault()}
            />
        );
    }

    if (item.icon) {
        return (
            <img 
                src={item.icon}
                alt={item.name}
                aria-hidden="true"
            />
        );
    }
    
    return null;
    
  
}

export default FileIcon