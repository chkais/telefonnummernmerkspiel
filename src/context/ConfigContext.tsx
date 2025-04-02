// src/context/ConfigContext.tsx
"use client";

import React, {createContext, useContext, useEffect, useState} from "react";
import {Config, defaultConfig, loadConfig, saveConfig} from "@/config";

interface ConfigContextProps {
    config: Config;
    setConfig: (config: Config) => void;
    reset: () => void;
}

const ConfigContext = createContext<ConfigContextProps | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [config, setConfig] = useState<Config>(defaultConfig);

    useEffect(() => {
        const loadedConfig = loadConfig();
        setConfig(loadedConfig);
    }, []);

    const updateConfig = (newConfig: Config) => {
        setConfig(newConfig);
        saveConfig(newConfig);
    };

    const reset = () => {
        if (document && localStorage) {
            localStorage.clear()
            setConfig(defaultConfig);
            saveConfig(defaultConfig);
        }
    }
    return (
        <ConfigContext.Provider value={{config, setConfig: updateConfig, reset}}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = (): ConfigContextProps => {
    const context = useContext(ConfigContext);
    if (!context) {
        throw new Error("useConfig must be used within a ConfigProvider");
    }
    return context;
};