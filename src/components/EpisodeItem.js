import { useContext } from "react";
import EpisodeContext from "../EpisodeContext";

const EpisodeItem = ({ episode }) => {
  const { setSelectedEpisode } = useContext(EpisodeContext);

  return (
    <div
      key={"episodeDiv" + episode.episode_id}
      data-testid={episode.episode_id}
      className="p-4 bg-slate-800 rounded-lg shadow-md border hover:shadow-md hover:bg-gray-500 border-slate-700 "
      onClick={() => {
        setSelectedEpisode(episode);
      }}
    >
      <div className="flex flex-col">
        <div className="font-semibold text-gray-300">
          Episode: {episode.episode_id}
        </div>
        <div className="text-lg font-bold text-white">{episode.title}</div>
        <div className="text-sm text-gray-400">
          Release Date: {episode.release_date}
        </div>
      </div>
    </div>
  );
};

export default EpisodeItem;
