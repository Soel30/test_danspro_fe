import { useEffect, useState } from "react";

const useCheckMobileScreen = () => {
    const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : "");
    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("resize", handleWindowSizeChange);
            return () => {
                window.removeEventListener("resize", handleWindowSizeChange);
            };
        }
    }, []);


    return parseInt(width.toString()) <= 900;
};

export default useCheckMobileScreen;