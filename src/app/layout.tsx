import "~/styles/globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { Inter, Kanit, Montserrat } from "next/font/google";
import TopNav from "./components/TopNav";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { Toaster } from "~/components/ui/sonner"

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
})

const kanit = Kanit({
    subsets: ["latin", "thai"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
    variable: "--font-kanit",
})

export const metadata = {
    title: "Math is fun. Guys!",
    description: "Website that help people learn math in fun way",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

function getAllfontClass() {
    const fonts = [inter, montserrat, kanit] as NextFontWithVariable[]
    return fonts.map((font) => font.variable).join(" ")
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`font-sans ${getAllfontClass()} font-montserrat text-black`}>
                    <TopNav/>
                    {children}
                    <Toaster richColors theme="light" expand={true}/>
                </body>
            </html>
        </ClerkProvider>
    );
}
