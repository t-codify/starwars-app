import { render, screen } from "@testing-library/react";
import EpisodeContext from "../../EpisodeContext";
import EpisodeDescription from "../EpisodeDescription";

jest.mock("../../utils/customHooks/useCalculateAvgRating", () => jest.fn());
jest.mock("../StarRatingComponent", () => () => (
  <div>Star Rating Component</div>
));
jest.mock("../CategoryComponent", () => ({ acc }) => (
  <div>{`Category: ${acc}`}</div>
));

describe("EpisodeDescription Component", () => {
  const mockEpisode = {
    episode_id: 1,
    title: "Episode I: The Phantom Menace",
    opening_crawl: "Turmoil has engulfed the Galactic Republic...",
    director: "George Lucas",
    producer: "Rick McCallum",
    release_date: "1999-05-19",
    metadata: {
      Poster: "https://via.placeholder.com/150",
      Ratings: [
        { Source: "Internet Movie Database", Value: "6.5/10" },
        { Source: "Rotten Tomatoes", Value: "51%" },
      ],
    },
  };

  it("renders a message when no episode is selected", () => {
    render(
      <EpisodeContext.Provider value={{ selectedEpisode: null }}>
        <EpisodeDescription />
      </EpisodeContext.Provider>
    );

    expect(
      screen.getByText("Select Episode to View Description")
    ).toBeInTheDocument();
  });

  it("renders episode details when an episode is selected", () => {
    render(
      <EpisodeContext.Provider value={{ selectedEpisode: mockEpisode }}>
        <EpisodeDescription />
      </EpisodeContext.Provider>
    );

    // Check title
    expect(
      screen.getByText("Episode I: The Phantom Menace")
    ).toBeInTheDocument();

    // Check opening crawl
    expect(
      screen.getByText("Turmoil has engulfed the Galactic Republic...")
    ).toBeInTheDocument();

    // Check metadata
    expect(screen.getByText("Director:")).toBeInTheDocument();
    expect(screen.getByText("George Lucas")).toBeInTheDocument();

    expect(screen.getByText("Producer:")).toBeInTheDocument();
    expect(screen.getByText("Rick McCallum")).toBeInTheDocument();

    expect(screen.getByText("Release Date:")).toBeInTheDocument();
    expect(screen.getByText("1999-05-19")).toBeInTheDocument();
    // Check poster
    expect(screen.getByAltText("Episode Poster").src).toContain(
      mockEpisode.metadata.Poster
    );

    // Check StarRatingComponent
    expect(screen.getByText("Star Rating Component")).toBeInTheDocument();

    // Check accordions
    expect(screen.getByText("Category: Characters")).toBeInTheDocument();
    expect(screen.getByText("Category: Planets")).toBeInTheDocument();
    expect(screen.getByText("Category: Species")).toBeInTheDocument();
    expect(screen.getByText("Category: Starships")).toBeInTheDocument();
    expect(screen.getByText("Category: Vehicles")).toBeInTheDocument();
  });
});
