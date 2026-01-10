export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="w-full flex justify-center items-center mt-15">
            <div className="max-w-6xl px-4 xl:px-0 py-10 lg:pt-16">
                <div className="inline-flex items-center">
                    <p className="text-neutral-700 dark:text-neutral-400 font-bold font-stretch-100%">Chrisy</p>
                    <div className="border-s border-neutral-700 ps-5 ms-5">
                        <p className="text-sm text-neutral-700 dark:text-neutral-400">
                            &copy; {year} Chris Yang. Build with passion and lots of coffee.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}