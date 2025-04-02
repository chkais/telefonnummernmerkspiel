// src/app/page.tsx
"use client";

import React from "react";
import {useConfig} from "@/context/ConfigContext";

export default function Home() {
    const {config, reset, setConfig} = useConfig();

    const updateScore = (points: number) => {
        const score = config.score + points;
        const newConfig = { ...config, score};
        setConfig(newConfig)
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <p className="mb-4 text-lg">Einstellungenl</p>
            <button
                className="w-full p-4 bg-red-300 bg-red-500 text-white rounded shadow-2xl"
                onClick={() => reset()}
            >
                Alles zurücksetzen
            </button>

            <button
                className="w-full p-4 bg-red-300 bg-red-500 text-white rounded shadow-2xl pt-2"
                onClick={() => updateScore(1)}
            >
                Score + 1
            </button>

            <button
                className="w-full p-4 bg-red-300 bg-red-500 text-white rounded shadow-2xl pt-2"
                onClick={() => updateScore(3)}
            >
                Score + 3
            </button>
        </div>
    );
}