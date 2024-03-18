/* eslint-disable prettier/prettier */
import React, { createContext, useState, ReactNode } from 'react';

interface AppContextType {
    options: string[];
    setOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

interface AppProviderProps {
    children: ReactNode;
}

export const AppContext = createContext<AppContextType>({
    options: [],
    setOptions: () => { },
});

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [options, setOptions] = useState<string[]>([]);

    return (
        <AppContext.Provider value={{ options, setOptions }}>
            {children}
        </AppContext.Provider>
    );
};
