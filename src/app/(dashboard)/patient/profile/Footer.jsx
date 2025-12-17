export default function Footer() {
    return (
        <footer className="w-full bg-white border-t border-gray-200 py-6 px-4 lg:px-8 mt-20">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-4 lg:gap-0">
                {/* Logo Section */}
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    </div>
                    <span className="text-lg font-bold text-gray-900">SmartHMS</span>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 lg:gap-8">
                    <a href="#privacy" className="text-gray-600 hover:text-gray-900 text-sm">
                        Privacy Policy
                    </a>
                    <a href="#terms" className="text-gray-600 hover:text-gray-900 text-sm">
                        Terms of Service
                    </a>
                    <a href="#help" className="text-gray-600 hover:text-gray-900 text-sm">
                        Help Center
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-gray-600 text-sm text-center lg:text-right">
                    ©2024 MediCare Plus Inc. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
