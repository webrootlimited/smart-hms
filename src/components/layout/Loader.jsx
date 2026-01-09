export default function Loader() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="flex flex-col items-center">
                {/* Spinner */}
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600" />

                {/* Text */}
                <p className="mt-3 text-sm font-medium text-gray-600">
                    Loading...
                </p>
            </div>
        </div>
    );
}
