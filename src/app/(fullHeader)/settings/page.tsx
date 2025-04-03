"use client";

import React, {useState} from "react";
import {useConfig} from "@/context/ConfigContext";
import {useRouter} from "next/navigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import ColorPicker from "@/components/ColorPicker";

export default function Home() {
    const {config, reset, setConfig} = useConfig();
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [color, setColor] = useState("pastel-purple");
    const colors = ["pastel-blue", "pastel-orange", "pastel-pink", "pastel-purple", "pastel-yellow", "pastel-green"];
    const router = useRouter();

    const handleAddContact = () => {
        if (config.contacts.length < 4) {
            const newContact = {name, number, color};
            setConfig({...config, contacts: [...config.contacts, newContact]});
            const edited = true
            setConfig({...config, edited})
            setName("");
            setNumber("");
            setColor("");
        } else {
            alert("Maximale Anzahl an Kontakten erreicht!");
        }
    };

    const handleDeleteContact = (index: number) => {
        const updatedContacts = config.contacts.filter((_, i) => i !== index);
        setConfig({...config, contacts: updatedContacts});
    };

    return (
        <div className="flex flex-col p-2 items-center justify-center">
            <h1 className="text-xl font-bold my-4">Einstellungen</h1>
            <button
                className="w-full p-4 my-2 bg-red-500 text-white rounded shadow-2xl"
                onClick={() => reset()}
            >
                Alles zurücksetzen
            </button>
            <button
                className="w-full p-4 my-2  bg-gray-400 text-white rounded shadow-2xl"
                onClick={() => router.push("/")}
            >
                Zurück
            </button>
            <div className="my-4 border-t border-primary-border mx-2 h-1 w-full" />
            <div className="mt-4 w-full flex flex-row justify-between">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 border rounded mb-2 w-5/12 h-10"
                />
                <input
                    type="text"
                    placeholder="Nummer"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="p-2 border rounded mb-2 w-5/12 h-10"
                />
                <ColorPicker
                    selectedColor={color}
                    onSelectColor={setColor}
                    colors={colors}
                />

            </div>
            <button
                className="p-2 bg-blue-500 text-white rounded mt-2 w-full"
                onClick={handleAddContact}
            >
                Nummer hinzufügen
            </button>
            <div className="my-4 border-t border-primary-border mx-2 h-1 w-full" />
            <div className="mt-4 w-full">
                <h2 className="text-lg font-bold mb-2">Nummern</h2>
                {config.contacts.map((contact, index) => (
                    <div key={index}
                         className={`p-2 mb-2 last:mb-0 flex flex-row w-full items-center justify-between border rounded bg-${contact.color} font-bold`}>
                        <div className={`w-5/12`}>{contact.name}</div>
                        <div className={"w-5/12"}>{contact.number}</div>
                        <button
                            className="bg-red-500 text-white rounded w-2/12 p-2"
                            onClick={() => handleDeleteContact(index)}
                        >
                            <FontAwesomeIcon icon={faTrashAlt}/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}