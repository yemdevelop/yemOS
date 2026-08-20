import trashEmpty from "../../assets/trash-icons/trash_empty_icon.png"
import trashFull from "../../assets/trash-icons/trash_full_icon.png"


const TrashIcon = ({ items = [], className = ""}) => {
    const isEmpty = items.length === 0;

  return (
    <img    
        src={isEmpty ? trashEmpty : trashFull}
        alt={isEmpty ? "Empty Trash" : "Full Trash"}
        className={className}
    />
  );
};

export default TrashIcon