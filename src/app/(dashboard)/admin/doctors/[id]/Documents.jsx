import { Upload, FileText, FolderOpen } from 'lucide-react';

export default function DocumentsUpload() {
    return (
        <div className="bg-gray-50">
            <div className="space-y-6">

                {/* Upload Card */}
                <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-10 text-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <Upload className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
                        </div>

                        <div>
                            <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1">
                                Upload New Document
                            </h3>
                            <p className="text-xs text-gray-500">
                                Drag & drop files here, or click to browse
                            </p>
                        </div>

                        <label className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition">
                            Choose Files
                            <input type="file" multiple className="hidden" />
                        </label>
                    </div>
                </div>

                {/* Documents List */}
                <div className="bg-white rounded-3xl shadow-sm p-6">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 text-center sm:text-left">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <FolderOpen className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-gray-800">
                                All Documents
                            </h2>
                            <p className="text-xs text-gray-500">
                                6 files uploaded
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {[
                            { name: 'Medical License.pdf', size: '2.4 MB', date: 'Jan 15, 2024', tag: 'License' },
                            { name: 'Board Certification.pdf', size: '1.8 MB', date: 'Jan 15, 2024', tag: 'Certificate' },
                            { name: 'DEA Certificate.pdf', size: '1.2 MB', date: 'Jan 15, 2024', tag: 'Certificate' },
                            { name: 'Insurance Policy.pdf', size: '3.1 MB', date: 'Jan 10, 2024', tag: 'Insurance' },
                            { name: 'Resume CV.pdf', size: '890 KB', date: 'Dec 20, 2023', tag: 'Resume' },
                            { name: 'Background Check.pdf', size: '450 KB', date: 'Dec 15, 2023', tag: 'Verification' },
                        ].map((doc, i) => (
                            <div
                                key={i}
                                className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition"
                            >
                                {/* Icon */}
                                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                                    <FileText className="w-5 h-5 text-red-600" />
                                </div>

                                {/* File Info */}
                                <div className="flex-1 text-center sm:text-left">
                                    <h4 className="text-sm font-medium text-gray-900">
                                        {doc.name}
                                    </h4>
                                    <p className="text-xs text-gray-500">
                                        {doc.size} • {doc.date}
                                    </p>
                                </div>

                                {/* Tag */}
                                <div className="flex justify-center sm:justify-end">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                        {doc.tag}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
