export const Header = () => {
    return (
        <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white min-h-[70px] tracking-wide relative z-50">
            <div className="flex flex-wrap items-center justify-between gap-5 w-full">
                <span className="max-sm:hidden">NHI IoT Explorer</span>
                <span className="hidden max-sm:block">NHI IoT Explorer</span>
                <div className="flex max-lg:ml-auto space-x-4">
                    <ul>
                    </ul>
                </div>
                <div className="flex max-lg:ml-auto space-x-4">

                </div>
            </div>
        </header>
    );
}