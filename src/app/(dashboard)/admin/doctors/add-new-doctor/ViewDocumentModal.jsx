// components/ViewDocumentModal.jsx
"use client";

import { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';

export default function ViewDocumentModal({ isOpen, onClose, file, title = "Document Preview" }) {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isImage, setIsImage] = useState(false);
    const [isPdf, setIsPdf] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isOpen || !file) {
            setPreviewUrl(null);
            setIsImage(false);
            setIsPdf(false);
            setError(null);
            return;
        }

        // Reset state
        setError(null);

        // Case 1: file is a URL string (from backend)
        if (typeof file === 'string') {
            const url = file;
            setPreviewUrl(url);

            const lowerUrl = url.toLowerCase();
            if (lowerUrl.endsWith('.pdf')) {
                setIsPdf(true);
                setIsImage(false);
            } else if (lowerUrl.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                setIsImage(true);
                setIsPdf(false);
            } else {
                setError("Unsupported file type. Only PDF and images are supported.");
            }
            return;
        }

        // Case 2: file is a File object (fresh upload)
        if (file instanceof File) {
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);

            if (file.type === 'application/pdf') {
                setIsPdf(true);
                setIsImage(false);
            } else if (file.type.startsWith('image/')) {
                setIsImage(true);
                setIsPdf(false);
            } else {
                setError("Unsupported file type. Only PDF and images are supported.");
            }

            // Cleanup object URL when component unmounts or file changes
            return () => {
                URL.revokeObjectURL(objectUrl);
            };
        }

        setError("Invalid file provided");
    }, [file, isOpen]);

    if (!isOpen) return null;

    const handleDownload = () => {
        if (!previewUrl) return;

        const link = document.createElement('a');
        link.href = previewUrl;
        link.download = typeof file === 'string'
            ? file.split('/').pop() || "document"
            : file.name || "document";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            {/* Modal container */}
            <div className="relative w-full max-w-5xl max-h-[95vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-900 truncate max-w-[70%]">
                        {title}
                    </h3>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleDownload}
                            className="cursor-pointer flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
                            disabled={!previewUrl}
                        >
                            <Download size={16} />
                            Download
                        </button>
                        <button
                            onClick={onClose}
                            className="cursor-pointer p-2 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-200 transition"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-4 bg-gray-100 flex items-center justify-center">
                    {error ? (
                        <div className="text-center text-red-600">
                            <p className="text-lg font-medium">{error}</p>
                            <p className="mt-2 text-sm">Please try uploading a different file.</p>
                        </div>
                    ) : previewUrl ? (
                        isImage ? (
                            <img
                                src={previewUrl}
                                alt="Document preview"
                                className="max-w-full max-h-[80vh] object-contain rounded shadow-lg"
                            />
                        ) : isPdf ? (
                            <iframe
                                src={previewUrl}
                                title="PDF Preview"
                                className="w-full h-full min-h-[70vh] rounded border border-gray-300 shadow-lg"
                            />
                        ) : (
                            <div className="text-center text-gray-600">
                                <p className="text-lg">Preview not available for this file type</p>
                                <button
                                    onClick={handleDownload}
                                    className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    Download File
                                </button>
                            </div>
                        )
                    ) : (
                        <div className="text-gray-500 animate-pulse">Loading preview...</div>
                    )}
                </div>

                {/* Footer - optional file info */}
                <div className="px-6 py-3 bg-gray-50 text-sm text-gray-600 border-t">
                    {typeof file === 'string' ? (
                        <span>File from server</span>
                    ) : file instanceof File ? (
                        <span>
                            {file.name} • {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                    ) : null}
                </div>
            </div>
        </div>
    );
}