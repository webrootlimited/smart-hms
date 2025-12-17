import Link from "next/link";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 lg:px-6 ">
            <div className="flex items-center justify-between gap-4">

                {/* Left Section */}
                <div className="flex items-center gap-4">

                    {/* Messages + Badge — always show */}
                    <div className="flex items-center gap-2">
                        <span className="text-lg lg:text-xl font-bold text-gray-900">
                            Messages
                        </span>
                        <span className="inline-flex relative bottom-2 right-2 items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-500 rounded-full">
                            3
                        </span>
                    </div>

                    {/* Encrypted Status — only show on lg+ */}
                    <div className="hidden lg:flex items-center gap-2 text-gray-600">
                        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium">End-to-end Encrypted</span>
                    </div>
                </div>

                {/* Search Bar — Always visible */}
                <div className="flex-1 max-w-sm">
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search messages, providers, departments..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Right Section — only lg+ */}
                <div className="hidden lg:flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-xs font-semibold text-gray-600 tracking-wide">HELP CENTER</p>
                        <Link href="#" className="text-sm font-semibold text-blue-500 hover:text-blue-600">
                            Support Online
                        </Link>
                    </div>

                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                        alt="Profile"
                        className="w-10 h-10 rounded-full border-2 border-gray-200"
                    />
                </div>
            </div>
        </header>
    );
}
