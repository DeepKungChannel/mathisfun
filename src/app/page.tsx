import Link from "next/link";
import { Button, buttonVariants } from '~/components/ui/button'


export default function HomePage() {
    return (
        <div>
            <div className="flex items-center flex-col font-montserrat h-[98vh] justify-center gap-2">
                <h1 className="text-2xl">MATH IS FUN! GUYS!</h1>
                <p className="text-xl">Try it out</p>
                <Link href="/login" className={`${buttonVariants({ variant: "outline" })} mt-5 font-montserrat dark text-white`}>Get Start</Link>
            </div>

        </div>
    )
}
