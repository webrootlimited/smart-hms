'use client';

import { X, MapPin } from 'lucide-react';

export default function MapModal({
    isOpen,
    onClose,
    latitude,
    longitude,
    title = 'Location',
}) {
    if (!isOpen) return null;

    // Validate coordinates
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
                    <MapPin className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Invalid Location</h2>
                    <p className="text-gray-600">Please provide valid latitude and longitude coordinates.</p>
                    <button
                        onClick={onClose}
                        className="mt-6 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    // Calculate small bounding box around the point
    const delta = 0.015; // ~1.5km view
    const bbox = `${lon - delta},${lat - delta},${lon + delta},${lat + delta}`;

    const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <MapPin className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                            <p className="text-sm text-gray-600">
                                Lat: {lat.toFixed(6)} • Lon: {lon.toFixed(6)}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition"
                        aria-label="Close map"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Map Embed */}
                <div className="flex-1 relative bg-gray-100">
                    <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        marginWidth="0"
                        src={embedUrl}
                        allowFullScreen
                    />
                    {/* Small overlay badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md flex items-center gap-2 text-sm font-medium text-gray-800">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        Location Set
                    </div>
                </div>

                {/* Footer attribution */}
                <div className="px-6 py-3 text-xs text-gray-500 bg-gray-50 text-center border-t">
                    © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">
                        OpenStreetMap
                    </a> contributors
                </div>
            </div>
        </div>
    );
}