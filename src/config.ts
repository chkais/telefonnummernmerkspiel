"use client";

// Define the difficulty enum
export enum Difficulty {
  Easy = "Leicht",
  Hard = "Profi",
}

export interface contact {
    name: string;
    number: string;
    color: string;
}

// Define the configuration interface
export interface Config {
  score: number;
  difficulty: Difficulty;
  contacts: contact[];
  selectedContact?: contact;
  success: boolean;
}

// Default configuration
export const defaultConfig: Config = {
  difficulty: Difficulty.Easy,
  score: 0,
  contacts: [
    { name: "Mama", number: "01784083803", color: "#ff70a6" },
    { name: "Papa", number: "01632315482", color: "#ff9770" },
    { name: "Oma & Opa Festnetz", number: "0221694288", color: "#7fc8f8" },
  ],
  success: false,
};

// Save configuration to local storage
export function saveConfig(config: Config): void {
  localStorage.setItem("appConfig", JSON.stringify(config));
}

// Load configuration from local storage
export function loadConfig(): Config {
  let config
  if (typeof window !== "undefined"){
    config = localStorage?.getItem("appConfig");
  }
  return config ? JSON.parse(config) : defaultConfig;
}

// Initialize configuration if not present
if (typeof window !== "undefined" && !localStorage.getItem("appConfig")) {
  saveConfig(defaultConfig);
}