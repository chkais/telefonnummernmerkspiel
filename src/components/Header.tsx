"use client";

import React, {useEffect, useState} from "react";
import {useConfig} from "@/context/ConfigContext";
import {faGear, faStar, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Difficulty} from "@/config";
import Image from "next/image";
import {useRouter} from "next/navigation";



export interface HeaderProps {
    reduced?: boolean
}

const Header: React.FC<HeaderProps> = ({reduced}: HeaderProps) => {
    const [difficulty, setDifficulty] = useState<string>("");
    const [scoreUpdated, setScoreUpdated] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const {config} = useConfig();
    const router = useRouter();

    function addOnePoint() {
        setScore(prevScore => prevScore + 1);
        setScoreUpdated(true)
        setTimeout(() => {
            setScoreUpdated(false)
        }, 200);
    }

    function addOnePointFast() {
        setScore(prevScore => prevScore + 1);
        setScoreUpdated(true)
        setTimeout(() => {
            setScoreUpdated(false)
        }, 50);
    }

    useEffect(() => {
        setDifficulty(config.difficulty);
        const amount = config.score - score;
        if (amount > 3) {
            for (let i = 0; i < amount; i++) {
                console.log(`Adding ${amount} points to score: ${score + i + 1}`);
                setTimeout(addOnePointFast, i * 60);
            }
        } else if (amount > 0) {
            for (let i = 0; i < amount; i++) {
                console.log(`Adding ${amount} points to score: ${score + i + 1}`);
                setTimeout(addOnePoint, i * 400);
            }
        } else if (amount < 0) {
            setScore(0)
        }
    }, [config]);

    const handleSettingClick = () => {
        router.push("/settings")
    };

    return (
        <>
            <header
                className={"relative flex flex-col items-center justify-center h-fit w-full bg-third pb-1 flex-none"}>
                < Image priority={true} className={`w-full h-35`}
                        src={`${reduced ? "/header_1.png" : "/header_1.png"}`}
                        alt={"Header Image Telefonnummer Merk Spiel"}
                        height={400} width={300} style={{
                    objectFit: `cover`,
                }}/>
                <button
                    className="absolute top-1 right-1 w-6 h-6 bg-primary border-3 border-primary-border text-third rounded-full flex items-center justify-center"
                    onClick={handleSettingClick}
                >
                    <FontAwesomeIcon className={""} size={"sm"} icon={faGear}/>
                </button>
                <h2 className={"text-primary-border text-lg font-bold flex flex-row justify-stretch w-full px-2 pb-2"}>
                    <div className={"w-1/3"}>Level: {difficulty === Difficulty.Easy ?
                        <FontAwesomeIcon className={"text-secondary"} icon={faStar}/> : <><FontAwesomeIcon
                            className={"text-secondary"} icon={faStar}/><FontAwesomeIcon className={"text-secondary"}
                                                                                         icon={faStar}/><FontAwesomeIcon
                            className={"text-secondary"} icon={faStar}/></>}</div>
                    <div className={`w-1/3 text-center rounded`}>
                        <div className={`rounded px-2 py-1 bg-${config.selectedContact?.color}`}>{config.selectedContact?.name}</div>
                    </div>
                    <div className={`w-1/3 text-right score ${scoreUpdated ? "incremented" : ""}`}><FontAwesomeIcon
                        className={"mr-1 text-secondary"}
                        icon={faStar}/>{score}
                    </div>
                </h2>
            </header>
        </>

    );
};

export default Header;