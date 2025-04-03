"use client"
import React from "react";

export default function Home() {
    return (
        <div className="flex flex-col w-full items-center justify-evenly p-4 mt-4">
            <h1 className={"text-xl font-bold mb-4"}>Impressum & Datenschutz</h1>
            <h2 className={"text-lg font-bold mb-4"}>Kontakt</h2>

            <p className={"text-left"}>
                Verantwortlicher i.S.d. § 55 Abs. 2 RStV:
            </p>
            <p className={" text-left"}>
                Christopher Kaiser<br/>
                Akazienweg 1<br/>
                50827 Köln<br/>
                mail@christopherkaiser.de <br/>
            </p>

            <h2 className={"text-lg font-bold my-4"}>Allgemeiner Hinweis</h2>
            <p className={"mb-4"}>
                Dies ist eine von mir privat für meine Kinder entwickelte Web-App. Sie wurde mit dem Ziel online
                gestellt,
                dass auch andere Menschen von dieser profitieren.
            </p>

            <p className={"mb-4"}>Hintergrund: Meine eigenen Kinder sind noch zu jung für Smartphones / Handys, sollen aber für Notfälle
                die
                Nummern ihrere Eltern können. Die App soll das erlernen ein bisschen vereinfachen.
            </p>

            <p  className={"mb-4"}>Wichtig war uns dabei auch eine zum Handy ähnliche Struktur der Tasten, damit sich im Zweifel auch die
                "Muster" eingeprägt werden.
            </p>

            <h2 className={"text-lg font-bold mb-4"}>Datenschutz</h2>
            <p  className={"mb-4"}>Die Seite verwendet keine Cookies, kein Tracking und keine Drittanbieter. Alle Daten verbleiben auf dem lokalen
                Gerät im Browser-Cache / Application Storage.
            </p>
            .
            <p className={"mb-4"}>Der Code ist einsehbar auf Github (unter folgender Adresse: )</p>
        </div>
    );
}