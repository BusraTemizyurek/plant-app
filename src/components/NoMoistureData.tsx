export const NoMoistureData = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="mb-4">
        <svg
          className="w-16 h-16 text-gray-400 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">
        No moisture data yet
      </h3>
      <p className="text-gray-500 max-w-sm">
        Your plant sensor has not recorded any moisture readings yet. Check that
        your sensor is connected and functioning properly.
      </p>
    </div>
  );
};
