import { useContext } from "react";
import EpisodeItem from "./EpisodeItem";
import EpisodeContext from "../EpisodeContext";
const EpisodeList = () => {
  const { filteredData } = useContext(EpisodeContext);

  return (
    filteredData && (
      <div>
        {filteredData.map((e) => {
          return <EpisodeItem key={e.episode_id} episode={e} />;
        })}
      </div>
    )
  );
};

export default EpisodeList;
