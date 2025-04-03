import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import {ConfigProvider} from "@/context/ConfigContext";
import Link from "next/link";
import React from "react";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Telefonnummern Merk Spiel",
    description: "Eine App zum Merken von Telefonnummern",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <div>
            <script>

            </script>
        </div>
        <ConfigProvider>
            <div className={"flex flex-col h-svh"}>
                <Header/>
                <div className={"flex-grow"}>
                    {children}
                </div>
                <div className={"h-8 bottom-0 mx-auto"}><Link href={"/impressum"}>Impressum</Link></div>
            </div>
        </ConfigProvider>
        </body>
        </html>
    );
}


