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
    { name: "Mama", number: "123456789", color: "pastel-orange" },
    { name: "Papa", number: "123456789", color: "pastel-pink" },
    { name: "Oma & Opa Festnetz", number: "123456789", color: "pastel-blue" },
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