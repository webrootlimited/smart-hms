import { Hospital, Video, MapPin, Calendar, Ticket, Laptop, Check, Clock } from 'lucide-react';
import Image from 'next/image';
import clinicLogo from "@/assets/book-appointment/hero-img.png"
import Link from 'next/link';

export default function App() {
    return (
        <>
            <section className="bg-[#F5F8FF] py-30 px-4 overflow-hidden relative">

                {/* Right Side Image */}
                <div className="hidden lg:block absolute right-0 top-20 w-60 opacity-95 pointer-events-none">
                    <Image src={clinicLogo} alt="Doctor" className="object-contain" />
                </div>

                <div className="max-w-5xl mx-auto text-center relative z-10">

                    {/* Heading */}
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
                        Book Your Appointment <span className="text-[#0284C7]">in Minutes</span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-lg font-medium text-gray-600 max-w-xl mx-auto leading-relaxed mb-10">
                        Choose a doctor, select a time, and confirm — fast and easy access to quality care.
                    </p>


                </div>
            </section>

            <div className="flex flex-col items-center justify-center px-4 py-12">


                <div className="w-full max-w-4xl text-center">
                    <h1 className="text-2xl md:text-3xl font-semibold mb-2">Book Appointment</h1>
                    <p className="text-md text-gray-600">Choose your preferred consultation type</p>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
                    {/* Physical Clinic Visit Card */}
                    <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-start">
                        <div className="flex items-center justify-between w-full mb-6">
                            <div className="bg-blue-100 p-3 rounded-2xl">
                                <Hospital className="w-8 h-8 text-blue-600" />
                            </div>
                            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                                Recommended
                            </span>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Physical Clinic Visit</h2>
                        <p className="text-gray-600 mb-6">Visit doctor at clinic location</p>

                        <ul className="space-y-4 mb-10">
                            <li className="flex items-center text-gray-700">
                                <MapPin className="w-5 h-5 text-green-500 mr-3" />
                                In-person consultation
                            </li>
                            <li className="flex items-center text-gray-700">
                                <Hospital className="w-5 h-5 text-green-500 mr-3" />
                                Choose clinic location
                            </li>
                            <li className="flex items-center text-gray-700">
                                <Ticket className="w-5 h-5 text-green-500 mr-3" />
                                Token-based queue system
                            </li>
                        </ul>

                        <Link href="/book-appointment/physical-doctors" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 text-center rounded-2xl transition cursor-pointer">
                            Book Clinic Visit
                        </Link>
                    </div>

                    {/* Online Consultation Card */}
                    <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-start">
                        <div className="flex items-center justify-between w-full mb-6">
                            <div className="bg-purple-100 p-3 rounded-2xl">
                                <Video className="w-8 h-8 text-purple-600" />
                            </div>
                            <span className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium">
                                Convenient
                            </span>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Online Consultation</h2>
                        <p className="text-gray-600 mb-6">Consult from home via video call</p>

                        <ul className="space-y-4 mb-10">
                            <li className="flex items-center text-gray-700">
                                <Video className="w-5 h-5 text-purple-500 mr-3" />
                                Video consultation
                            </li>
                            <li className="flex items-center text-gray-700">
                                <Laptop className="w-5 h-5 text-purple-500 mr-3" />
                                No travel required
                            </li>
                            <li className="flex items-center text-gray-700">
                                <Clock className="w-5 h-5 text-purple-500 mr-3" />
                                Instant confirmation
                            </li>
                        </ul>

                        <Link href="/book-appointment/online-doctors" className="w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-2xl transition cursor-pointer">
                            Book Online Consultation
                        </Link>
                    </div>
                </div>

                <div className="mt-12 w-full max-w-5xl">
                    <p className="bg-blue-50 text-blue-800 text-sm px-6 py-4 rounded-2xl text-left">
                        <strong>i Note:</strong> Physical appointments require clinic visit and follow token-based queuing. Online consultations are conducted via secure video call with advance payment.
                    </p>
                </div>
            </div>
        </>
    );
}