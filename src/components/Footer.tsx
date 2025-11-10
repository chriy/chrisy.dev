export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="relative overflow-hidden mt-15 bg-transparent">
            <div className="w-full max-w-5xl px-4 xl:px-0 py-10 lg:pt-16 mx-auto">
                <div className="inline-flex items-center">
                    <p className="text-primary-text-light dark:text-primary-text-dark font-bold font-stretch-100%">Chrisy</p>
                    <div className="border-s border-neutral-700 ps-5 ms-5">
                        <p className="text-sm text-primary-text-light dark:text-primary-text-dark">
                            &copy; {year} Chris Yang. Build with passion and lots of coffee.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}