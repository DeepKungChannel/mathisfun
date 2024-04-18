import "~/styles/globals.css";

import { Inter, Montserrat } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import TopNav from "./components/TopNav";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    weight: ["400", "700"],
    display: "swap",
})

export const metadata = {
    title: "Math is fun. Guys!",
    description: "Website that help people learn math in fun way",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

function getAllfontClass() {
    const fonts = [inter, montserrat] as NextFontWithVariable[]
    return fonts.map((font) => font.variable).join(" ")
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`font-sans ${getAllfontClass()} font-montserrat text-black`}>
                <TopNav/> 
                {children}
            </body>
        </html>
    );
}
