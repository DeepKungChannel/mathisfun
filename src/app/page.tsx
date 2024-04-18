import Link from "next/link";
import { buttonVariants } from '~/components/ui/button'
import Tryitout from "./tryitout";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";


export default function HomePage() {
    return (
        <div>
            <div className="flex items-center flex-col font-montserrat h-[98vh] justify-center gap-2">
                <h1 className="text-2xl">MATH IS FUN! GUYS!</h1>
                <p className="text-xl">Try it out</p>
                <SignedOut>
                    <div className={`${buttonVariants({ variant: "outline" })} mt-5 font-montserrat dark text-white`}><SignInButton/></div>
                </SignedOut>
                <SignedIn>
                    <Link href="/problems" className={`${buttonVariants({ variant: "outline" })} mt-5 font-montserrat dark text-white`}>Get Start!</Link>
                </SignedIn>
            </div>

        </div>
    )
}
