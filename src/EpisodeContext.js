import { createContext } from "react";

const EpisodeContext = createContext({
  selectedEpisode: {},
  episodeData: {},
  filteredData: {},
});

export default EpisodeContext;
