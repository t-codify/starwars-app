import { useContext, useEffect, useState } from "react";
import EpisodeDescription from "./EpisodeDescription";
import EpisodeList from "./EpisodesList";
import SearchBar from "./SearchBar";
import EpisodeContext from "../EpisodeContext";

const DashboardComponent = () => {
  const { setEpisodeData, setFilteredData, episodeData } =
    useContext(EpisodeContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetched, setFetched] = useState(false);

  const getData = async () => {
    try {
      const response = await fetch("https://swapi.dev/api/films/?format=json");
      if (!response.ok) throw new Error("Failed to fetch episodes");
      const episodesList = await response.json();
      const episodes = episodesList.results;
      episodes.map(async (e) => {
        const data = await fetch(
          "http://www.omdbapi.com/?apikey=b9a5e69d&t=Star+wars&y=" +
            e.release_date.split("-")[0]
        );
        e.metadata = await data.json();
      });
      setEpisodeData(episodesList.results);
      setFilteredData(episodesList.results);
      setLoading(false);
      setFetched(true);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!fetched) getData();
  }, [fetched]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading episodes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    episodeData && (
      <div className="w-full h-screen flex flex-col">
        <div className="w-full border-b border-slate-700">
          <SearchBar />
        </div>

        <div className="flex flex-grow overflow-hidden">
          <div className="w-1/3 h-full overflow-y-auto border-r border-slate-700">
            <EpisodeList />
          </div>

          <div className="w-2/3 h-full overflow-y-auto">
            <EpisodeDescription />
          </div>
        </div>
      </div>
    )
  );
};

export default DashboardComponent;
