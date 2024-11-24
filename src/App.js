import React from "react";
import DashboardComponent from "./components/DashboardComponent";

import { useState } from "react";
import EpisodeContext from "./EpisodeContext";

function App() {
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [episodeData, setEpisodeData] = useState(null);
  const [filteredData, setFilteredData] = useState({});
  return (
    <EpisodeContext.Provider
      value={{
        selectedEpisode: selectedEpisode,
        setSelectedEpisode,
        episodeData: episodeData,
        setEpisodeData,
        filteredData: filteredData,
        setFilteredData,
      }}
    >
      <DashboardComponent />
    </EpisodeContext.Provider>
  );
}

export default App;
