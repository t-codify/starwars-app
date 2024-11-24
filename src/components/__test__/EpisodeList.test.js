import { render, screen } from "@testing-library/react";
import EpisodeContext from "../../EpisodeContext";
import EpisodeList from "../EpisodesList";

// Mock the EpisodeItem component
jest.mock("../EpisodeItem", () => ({ episode }) => (
  <div data-testid="episode-item">{episode.title}</div>
));

describe("EpisodeList Component", () => {
  const mockFilteredData = [
    { episode_id: 1, title: "Episode I: The Phantom Menace" },
    { episode_id: 2, title: "Episode II: Attack of the Clones" },
    { episode_id: 3, title: "Episode III: Revenge of the Sith" },
  ];

  const renderEpisodeList = (contextValue) => {
    return render(
      <EpisodeContext.Provider value={contextValue}>
        <EpisodeList />
      </EpisodeContext.Provider>
    );
  };

  it("renders a list of episodes", () => {
    renderEpisodeList({ filteredData: mockFilteredData });

    const items = screen.getAllByTestId("episode-item");
    expect(items).toHaveLength(mockFilteredData.length);

    // Verify each episode's title is rendered
    mockFilteredData.forEach((episode, index) => {
      expect(items[index]).toHaveTextContent(episode.title);
    });
  });
});
