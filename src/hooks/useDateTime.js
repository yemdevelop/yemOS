import { useState, useEffect } from "react";


export const useDateTime = () => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => {
            setNow(new Date());
        }, 60000);

        return () => clearInterval(id);
    }, []);

    return now;    
}

