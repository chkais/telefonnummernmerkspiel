"use client";

import React, {useEffect, useState} from "react";
import {useConfig} from "@/context/ConfigContext";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Difficulty} from "@/config";
import Image from "next/image";

const Header: React.FC = () => {
    const [difficulty, setDifficulty] = useState<string>("");
    const [scoreUpdated, setScoreUpdated] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const {config} = useConfig();

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

    return (
        <>
            <header
                className={"flex flex-col items-center justify-center h-fit w-full bg-third pb-1 flex-none"}>
                <Image priority={true} className={"w-full h-35"} src={"/header_1.png"} alt={"Header Image Telefonnummer Merk Spiel"}
                       height={100} width={300} style={{
                    objectFit: 'cover',
                }}/>
                <h2 className={"text-primary-border text-lg font-bold flex flex-row justify-stretch w-full px-2 pb-2"}>
                    <div className={"w-1/3"}>Level: {difficulty === Difficulty.Easy ?
                        <FontAwesomeIcon className={"text-secondary"} icon={faStar}/> : <><FontAwesomeIcon
                            className={"text-secondary"} icon={faStar}/><FontAwesomeIcon className={"text-secondary"}
                                                                                         icon={faStar}/><FontAwesomeIcon
                            className={"text-secondary"} icon={faStar}/></>}</div>
                    <div className={`w-1/3 text-center rounded`}><div style={{background: config.selectedContact?.color}}
                        className={`rounded px-2 py-1 `}>{config.selectedContact?.name}</div>
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