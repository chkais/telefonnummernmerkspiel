import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import {ConfigProvider} from "@/context/ConfigContext";
import {Footer} from "@/components/footer";


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
                <Header reduced={true}/>
                <div className={"flex-grow"}>
                    {children}
                </div>
                <Footer/>
            </div>
        </ConfigProvider>

        </body>
        </html>
    );
}


