// components/PersonalInfoCard.tsx
import Image from 'next/image';
import { Camera } from 'lucide-react';

export default function PersonalInfoCard() {
    return (
        <div className="w-full bg-gradient-to-b from-blue-50 to-white rounded-2xl shadow-sm overflow-hidden">
            <div className="flex flex-col md:flex-row items-center md:items-start p-8 gap-8">
                {/* Left: Profile Picture */}
                <div className="relative flex-shrink-0">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                        <Image
                            src="/woman-sunglasses.jpg" // Replace with your actual image in /public
                            alt="Profile"
                            width={160}
                            height={160}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute bottom-0 right-0 translate-x-2 translate-y-2 bg-blue-600 rounded-full p-3 shadow-lg border-4 border-white">
                        <Camera className="w-5 h-5 text-white" />
                    </div>
                </div>

                {/* Right: Text Content */}
                <div className="flex-1 text-center md:text-left mt-4 md:mt-0">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Personal Information
                    </h2>
                    <p className="mt-2 text-base text-gray-600">
                        Manage your personal details and contact info
                    </p>
                </div>

                {/* Decorative Illustration (Right Side) */}
                <div className="hidden lg:block flex-shrink-0">
                    <div className="bg-blue-100 rounded-2xl p-6 shadow-inner">
                        <div className="w-64 h-48 bg-gradient-to-br from-blue-200 to-blue-300 rounded-xl flex items-center justify-center">
                            {/* Placeholder for illustration - replace with actual SVG/Image if needed */}
                            <div className="text-center">
                                <div className="bg-white rounded-lg shadow-md p-4 inline-block">
                                    <div className="w-16 h-16 bg-blue-200 rounded-full mx-auto mb-3"></div>
                                    <div className="text-sm font-medium text-gray-700">Doctor Profile</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}