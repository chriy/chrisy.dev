import Image from "next/image";
import logo from "@/images/logo.png";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-theme-light dark:bg-theme-dark">
            <div className="relative flex flex-col items-center gap-6">
                <Image
                    src={logo}
                    alt="Loading..."
                    width={120}
                    height={120}
                    priority
                    loading="eager"
                    className="rounded-full shadow-lg animate-breathe"
                />
            </div>
        </div>
    )
}