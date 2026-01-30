import { createContext, useState } from "react";

export const TheamConext = createContext();


export const TheamProvider = ({ children }) => {
    const [theam, setTheam] = useState('light');


    const toggleButton = () => {
        setTheam(prev => (prev === "light" ? 'dark' : 'light'))
    }

    return (
        <TheamConext.Provider value={{ theam, toggleButton }}>
            {children}
        </TheamConext.Provider>
    )
}