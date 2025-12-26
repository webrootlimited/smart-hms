export default function FullPageLoader() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">

            {/* Spinner */}
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/30 border-t-white" />

            {/* Text */}
            <p className="mt-4 text-sm font-medium tracking-wide text-white">
                Loading, please wait...
            </p>

        </div>
    );
}
