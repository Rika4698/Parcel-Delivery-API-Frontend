const LoadingSpinner = () => {
    return (
        <div className="h-screen bg-white dark:bg-gray-700">
            <div className="flex h-full w-full items-center justify-center">
                <div className="loader dark:loader" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner;