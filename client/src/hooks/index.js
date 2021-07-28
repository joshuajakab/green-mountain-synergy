import { useEffect, useState } from "react";
import useAuth from './useAuth';
import useAdminAuth from './useAdminAuth';

export {
    useAuth,
    useAdminAuth
}

export const useWindowWidthAndHeight = () => {

    const windowInnerSize = [window.innerWidth, window.innerHeight];

    const [windowSize, setWindowSize] = useState(windowInnerSize);

    useEffect(() => {
        const changeWindowSize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener('resize', changeWindowSize);

        return () => window.removeEventListener('resize', changeWindowSize);
    }, []);

    return windowSize
}



