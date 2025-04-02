"use client"
import {useRouter} from "next/navigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressBook, faArrowRotateForward, faXmark} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export function Footer() {
    const router = useRouter();

    const handleNochmal = () => {
        router.push("/play");
    };

    const handleAndereNummer = () => {
        router.push("/contacts");
    };

    const handleAndereSchwierigkeit = () => {
        router.push("/");
    };


    return (
        <div className="flex flex-row items-center justify-around w-full grid-cols-3 mb-4 flex-none">
            <button
                className="w-16 h-16 bg-primary border-3 border-primary-border text-third rounded-full flex items-center justify-center"
                onClick={handleNochmal}
            >
                <FontAwesomeIcon className={""} size={"xl"} icon={faArrowRotateForward}/>
            </button>
            <button
                className="w-16 h-16 bg-primary border-3 border-primary-border text-third rounded-full flex items-center justify-center"
                onClick={handleAndereNummer}
            >
                <FontAwesomeIcon className={""} size={"xl"} icon={faAddressBook}/>
            </button>
            <button
                className="w-16 h-16 bg-primary border-3 border-primary-border text-third rounded-full flex items-center justify-center"
                onClick={handleAndereSchwierigkeit}
            >
                <FontAwesomeIcon className={""} size={"xl"} icon={faXmark}/>
            </button>

        </div>
    )
}