import { Mail, Phone, Edit2, Plus } from 'lucide-react';

export default function TeamAssistants() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="">
                {/* Assistants Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Emily Carter */}
                    <div className="bg-white rounded-3xl shadow-sm p-6">
                        <div className="flex items-start justify-between mb-5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                    EC
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                                        Emily Carter
                                        <button className="p-1 hover:bg-gray-100 rounded transition">
                                            <Edit2 className="w-4 h-4 text-gray-500" />
                                        </button>
                                    </h3>
                                    <p className="text-xs text-gray-500">Medical Assistant</p>
                                    <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-gray-50 rounded-2xl p-3 flex items-center gap-3">
                                <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                <span className="text-xs text-gray-700">emily.carter@hospital.com</span>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-3 flex items-center gap-3">
                                <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                <span className="text-xs text-gray-700">+1 (555) 234-5678</span>
                            </div>
                        </div>
                    </div>

                    {/* Michael Torres */}
                    <div className="bg-white rounded-3xl shadow-sm p-6">
                        <div className="flex items-start justify-between mb-5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                    MT
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                                        Michael Torres
                                        <button className="p-1 hover:bg-gray-100 rounded transition">
                                            <Edit2 className="w-4 h-4 text-gray-500" />
                                        </button>
                                    </h3>
                                    <p className="text-xs text-gray-500">Nurse Practitioner</p>
                                    <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-gray-50 rounded-2xl p-3 flex items-center gap-3">
                                <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                <span className="text-xs text-gray-700">michael.torres@hospital.com</span>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-3 flex items-center gap-3">
                                <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                <span className="text-xs text-gray-700">+1 (555) 345-6789</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add New Assistant Card */}
                <div className="max-w-md mx-auto">
                    <button className="w-full bg-white rounded-3xl shadow-sm p-10 flex flex-col items-center justify-center gap-4 hover:shadow-md transition">
                        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                            <Plus className="w-7 h-7 text-blue-600" />
                        </div>
                        <div className="text-center">
                            <p className="text-base font-medium text-gray-800">Add Assistant</p>
                            <p className="text-xs text-gray-500 mt-1">Assign a new team member</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}