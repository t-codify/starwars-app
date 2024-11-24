import { useState, useContext } from "react";
import EpisodeContext from "../EpisodeContext";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const { episodeData, setFilteredData, filteredData } =
    useContext(EpisodeContext);
  const [sortOrder, setSortOrder] = useState("asc");
  const OPTIONS = ["Most Recent", "Oldest", "Latest Episode", "Oldest Episode"];

  // Sort function
  const sortedData = (arr, order) => {
    console.log(arr, order);
    return [...arr].sort((a, b) => {
      switch (order) {
        case "Most Recent":
          return b.release_date.split("-")[0] - a.release_date.split("-")[0];
        case "Oldest":
          return a.release_date.split("-")[0] - b.release_date.split("-")[0];
        case "Latest Episode":
          return b.episode_id - a.episode_id;
        case "Oldest Episode":
          return a.episode_id - b.episode_id;
      }
    });
  };

  // Toggle sort order and update filtered data
  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    const sortedList = sortedData(filteredData, newOrder);
    setFilteredData(sortedList);
  };
  const changeSortOrder = (e) => {
    //e.target.innerHTML();
    console.log(filteredData, e.target.value);
    const sortedList = sortedData(filteredData, e.target.value);
    setFilteredData(sortedList);
  };

  // Handle search
  const handleSearch = () => {
    const filteredList = episodeData.filter((ep) =>
      ep.title?.toLowerCase().includes(searchText.toLowerCase())
    );
    const sortedList = sortedData(filteredList, sortOrder);
    setFilteredData(sortedList);
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-slate-800 rounded-lg shadow-md">
      {/* Sort button */}

      <select
        onChange={changeSortOrder}
        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-gray-200 font-medium rounded-md"
      >
        {OPTIONS.map((opt) => {
          return (
            <option key={opt} value={opt}>
              {opt}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search..."
        className="flex-grow px-4 py-2 border border-slate-700 rounded-md  text-gray-200 bg-slate-900 "
      />

      {/* Search button */}
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 "
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
