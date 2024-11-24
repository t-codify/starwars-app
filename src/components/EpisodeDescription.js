import { useContext, useEffect, useState } from "react";
import EpisodeContext from "../EpisodeContext";
import CategoryComponent from "./CategoryComponent";
import useCalculateAvgRating from "../utils/customHooks/useCalculateAvgRating";
import StarRatingComponent from "./StarRatingComponent";

const EpisodeDescription = () => {
  const { selectedEpisode } = useContext(EpisodeContext);
  const accordions = [
    "Characters",
    "Planets",
    "Species",
    "Starships",
    "Vehicles",
  ];
  const avgRating = useCalculateAvgRating(selectedEpisode?.metadata?.Ratings);

  if (!selectedEpisode)
    return (
      <div className="font-semibold text-gray-300">
        Select Episode to View Description
      </div>
    );
  else
    return (
      selectedEpisode && (
        <div className="flex flex-col h-full max-h-full p-6 bg-slate-800 rounded-lg shadow-md overflow-auto">
          <h1 className="text-3xl font-bold text-white mb-4">
            {selectedEpisode.title}
          </h1>
          <div className="flex items-start mb-6">
            <img
              className="w-48 h-72 object-cover rounded-md mr-6"
              src={selectedEpisode.metadata.Poster}
              alt="Episode Poster"
            />
            <p className="text-gray-300 leading-relaxed">
              {selectedEpisode.opening_crawl}
            </p>
          </div>

          <div className="flex items-center mb-6">
            <StarRatingComponent key="rating" averageRating={avgRating} />
          </div>
          <div className="flex items-center mb-6">
            {selectedEpisode.metadata.Ratings?.map((r, i) => {
              return (
                <span
                  key={r.Source + i}
                  className="text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-gray-700 text-blue-400 border border-blue-400"
                >
                  {r.Source + "  " + r.Value}
                </span>
              );
            })}
          </div>

          <div className="text-gray-400 mb-6 space-y-2">
            <p>
              <span className="font-semibold">Director:</span>{" "}
              <span className="text-white">{selectedEpisode.director}</span>
            </p>
            <p>
              <span className="font-semibold">Producer:</span>{" "}
              <span className="text-white">{selectedEpisode.producer}</span>
            </p>
            <p>
              <span className="font-semibold">Release Date:</span>{" "}
              <span className="text-white">{selectedEpisode.release_date}</span>
            </p>
          </div>

          <div className="w-full">
            {accordions.map((acc) => (
              <CategoryComponent
                key={`acc-${acc}`}
                acc={acc}
                selectedEpisode={selectedEpisode}
              />
            ))}
          </div>
        </div>
      )
    );
};

export default EpisodeDescription;
