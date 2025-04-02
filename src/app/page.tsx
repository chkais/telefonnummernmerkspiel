// src/app/page.tsx
"use client";

import React from "react";
import { useRouter } from 'next/navigation';
import {useConfig} from "@/context/ConfigContext";
import {Difficulty} from "@/config";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAward, faLightbulb, faStar} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
    const router = useRouter();
    const { config, setConfig} = useConfig();

    const handleDifficultyChange = (difficulty: Difficulty) => {
        const newConfig = { ...config, difficulty };
        setConfig(newConfig);
        router.push("/contacts");
    };

    return (
        <div className="flex flex-col items-center justify-evenly p-4 mt-4">
            <button
                className="w-full p-4 bg-easy text-third border-green-700 font-bold rounded flex flex-row items-center justify-center drop-shadow-md"
                onClick={() => handleDifficultyChange(Difficulty.Easy)}
            >
                <FontAwesomeIcon icon={faLightbulb} /><div className={"ml-2"}>Beginner (<FontAwesomeIcon className={"text-secondary"} icon={faStar}/>)</div>
            </button>
            <button
                className="w-full mt-4 p-4 bg-hard
                 text-third border-hard-500 font-bold rounded flex flex-row items-center justify-center drop-shadow-md"
                onClick={() => handleDifficultyChange(Difficulty.Hard)}
            >
                <FontAwesomeIcon icon={faAward} /><div className={"ml-2"}>Profi (<FontAwesomeIcon className={"text-secondary"} icon={faStar}/><FontAwesomeIcon className={"text-secondary"} icon={faStar}/><FontAwesomeIcon className={"text-secondary"} icon={faStar}/>)</div>
            </button>
        </div>
    );
}