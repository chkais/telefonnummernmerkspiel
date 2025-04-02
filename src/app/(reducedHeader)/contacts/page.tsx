"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useConfig } from "@/context/ConfigContext";

export default function Page() {
    const { config, setConfig } = useConfig();
    const router = useRouter();

    const handleContactClick = (contact: { name: string; number: string; color: string }) => {
        const newConfig = { ...config, selectedContact: contact };
        setConfig(newConfig);
        router.push("/play");
    };

    return (
        <div className="flex flex-col p-4">
            {config.contacts.map((contact, index) => (
                <button
                    key={index}
                    className={`w-full mb-2 p-4 text-primary-border font-bold rounded drop-shadow-md bg-${contact.color}`}
                    onClick={() => handleContactClick(contact)}
                >
                    {contact.name}
                </button>
            ))}
        </div>
    );
}