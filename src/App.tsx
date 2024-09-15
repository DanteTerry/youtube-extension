import { useState } from "react";

function App() {
  const [keyword, setKeyword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleApplyKeyword = () => {
    if (keyword.trim() === "") {
      setStatusMessage("Please enter a keyword.");
      return;
    }
    setStatusMessage("Keyword applied successfully!");
  };

  return (
    <div className="p-6 bg-gray-900 text-white  shadow-md w-96">
      <h1 className="text-2xl font-bold text-white mb-4 border-b-2 border-red-600 pb-2">
        YouTube Video Filter
      </h1>
      <div className="mb-4">
        <label htmlFor="keyword" className="block mb-2 text-sm font-medium">
          Enter a keyword to filter videos:
        </label>
        <input
          type="text"
          id="keyword"
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-md border-2 border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="e.g. React, Music, Tutorial"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          onClick={handleApplyKeyword}
        >
          Apply Filter
        </button>
      </div>
      {statusMessage && (
        <p className="mt-4 text-sm text-red-400">{statusMessage}</p>
      )}
    </div>
  );
}

export default App;
