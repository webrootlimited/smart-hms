export default function FullPageLoader() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">

            {/* Spinner */}
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600" />

            {/* Text */}
            <p className="mt-4 text-sm font-medium text-gray-600">
                Loading, please wait...
            </p>

        </div>
    );
}
