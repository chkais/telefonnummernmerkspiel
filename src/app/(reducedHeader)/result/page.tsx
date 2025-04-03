// src/app/success/page.tsx
"use client";

import React from "react";
import {useConfig} from "@/context/ConfigContext";
import Image from "next/image";
import {Difficulty} from "@/config";

export default function Success() {
    const { config } = useConfig();
    return (
        <div className="flex flex-col items-center justify-center mt-4 max-w-lg mx-auto">
            <Image
                src={config.success ? config.difficulty === Difficulty.Easy ? "/super_3.1.png": "/super_3.3.png" : "/try_again_3.png"}
                alt={config.success ? "Motivational for kids" : "Try again"}
                className="mb-4 w-1/2 h-auto rounded w-full result_animation p-4"
                width={900}
                height={900}
                style={{objectFit: "contain"}}
            />
        </div>
    );
}