import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#0F172A] text-white py-12 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* Brand Column */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <div className="relative w-10 h-10">
                            <Image
                                src="/smarthms-logo-white.png" // replace with your actual logo
                                alt="SmartHMS Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="text-2xl font-bold text-white">SmartHMS</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                        Premium healthcare management system for modern medical facilities.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
                        Quick Links
                    </h3>
                    <ul className="space-y-3">
                        <li>
                            <Link href="/doctors" className="text-gray-500 hover:text-gray-400 transition text-sm">
                                Find Doctors
                            </Link>
                        </li>
                        <li>
                            <Link href="/book" className="text-gray-500 hover:text-gray-400 transition text-sm">
                                Book Appointment
                            </Link>
                        </li>
                        <li>
                            <Link href="/telehealth" className="text-gray-500 hover:text-gray-400 transition text-sm">
                                Telehealth
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
                        Support
                    </h3>
                    <ul className="space-y-3">
                        <li>
                            <Link href="/help" className="text-gray-500 hover:text-gray-400 transition text-sm">
                                Help Center
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="text-gray-500 hover:text-gray-400 transition text-sm">
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/privacy" className="text-gray-500 hover:text-gray-400 transition text-sm">
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
                        Contact
                    </h3>
                    <div className="space-y-3 text-sm">
                        <p className="text-gray-500">support@medcarepro.com</p>
                        <p className="text-gray-500">1-800-MEDCARE</p>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright */}
            <div className="mt-12 pt-8 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
                    © 2023 MedCarePro. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
