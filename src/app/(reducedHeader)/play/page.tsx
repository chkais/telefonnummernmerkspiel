"use client";

import React, {useEffect, useState} from "react";
import {useConfig} from "@/context/ConfigContext";
import {Difficulty} from "@/config";
import {useRouter} from "next/navigation";
import {faDeleteLeft, faPhone} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Play() {
    const {config, setConfig} = useConfig();
    const router = useRouter();
    const [inputValue, setInputValue] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [pressedButton, setPressedButton] = useState<string | null>(null);

    const selectedContact = config.selectedContact;

    const formatPhoneNumber = (value: string) => {
        // Remove all non-digit characters
        const cleaned = value.replace(/\D/g, '');

        // Extract the first 4 digits
        const firstPart = cleaned.slice(0, 4);
        // Extract the remaining digits and group them into 2-tuples
        const remainingPart = cleaned.slice(4).match(/.{1,2}/g);

        if (remainingPart) {
            return [firstPart, ...remainingPart].filter(Boolean).join(' ');
        }
        return [firstPart].filter(Boolean).join(' ');
    };

    useEffect(() => {
        if (config.difficulty === Difficulty.Easy && selectedContact) {
            setIsValid(selectedContact.number.startsWith(inputValue.replace(/\D/g, '')));
        }
    }, [inputValue, config.difficulty, selectedContact]);

    const handleButtonClick = (value: string) => {
        setPressedButton(value);
        const newValue = formatPhoneNumber(inputValue + value);
        setInputValue(newValue);
        if (navigator.vibrate) {
            navigator.vibrate(50); // Vibrate for 50ms
        }
        setTimeout(() => setPressedButton(null), 150); // Reset the pressed state after 200ms
    };

    const handleDelete = () => {
        setPressedButton("delete");
        setInputValue((prev) => prev.slice(0, -1).trim());
        if (navigator.vibrate) {
            navigator.vibrate(50); // Vibrate for 50ms
        }
        setTimeout(() => setPressedButton(null), 150); // Reset the pressed state after 200ms
    };

    const handleFertig = () => {
        setPressedButton("fertig");
        setTimeout(() => {
            setPressedButton(null);
            const success = selectedContact ? selectedContact.number === inputValue.replace(/\D/g, '') : false;
            let score = config.score;
            if (success) {
                if (config.difficulty === Difficulty.Easy) {
                    score = score + 1;
                } else if (config.difficulty === Difficulty.Hard) {
                    score = score + 3;
                }
            }
            setConfig({...config, success, score});
            router.push("/result")
        }, 300);
    };

    return (
        <div className="flex flex-col items-center p-4 max-w-lg mx-auto">
            <input
                type="tel"
                value={inputValue}
                readOnly
                className={`mb-4 p-2 border-4 text-2xl ${isValid ? inputValue.length > 0 && config.difficulty === Difficulty.Easy ? "border-green-400" : "border-gray-200" : "border-red-400"} rounded w-full text-center`}

            />
            <div className="grid grid-cols-3 gap-2 mb-4 w-full">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "#", "0", "*"].map(
                    (number) => {
                        if (number === "*" || number === "#") {
                            return <div key={number} />;
                        }
                        return (
                            <button
                                key={number}
                                className={`p-4 bg-gray-200 rounded ${pressedButton === number ? "bg-gray-400" : ""}`}
                                onClick={() => handleButtonClick(number)}
                            >
                                {number}
                            </button>
                        )
                    }
                )}
            </div>
            <div className="flex justify-between items-center w-full px-7">
                <div className={"spacer w-16 h-16"}></div>
                <button
                    className={`w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center ${pressedButton === "fertig" ? "bg-gray-400" : ""}`}
                    onClick={handleFertig}
                >
                    <FontAwesomeIcon className={""} size={"xl"} icon={faPhone} />
                </button>
                <button
                    className={`w-16 h-16 bg-hard-500 text-white rounded-lg flex items-center justify-center ${pressedButton === "delete" ? "bg-red-700" : ""}`}
                    onClick={handleDelete}
                >
                    <FontAwesomeIcon icon={faDeleteLeft} size="xl" />
                </button>
            </div>
        </div>
    );
}