import styles from "./MinimizedWindowIcon.module.css";

const MinimizedWindowIcon = ({ 
  children,
  onClick,
  ariaLabel,
}) => {
  return (
    <div 
        className={styles.slot}
        role="button"
        tabIndex={0}
        aria-label={ariaLabel}
        onClick={onClick}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" ||
            event.key === ""
          ) {
            event.preventDefault();
            onClick?.();
          }
        }}
    >   
      <div 
        className={styles.previewViewport}
        aria-hidden="true"
      >
        <div className={styles.previewScale}>
          {children}
        </div>
      </div>
    </div>  
  );
};

export default MinimizedWindowIcon;