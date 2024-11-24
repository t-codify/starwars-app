import { render, screen, fireEvent } from "@testing-library/react";
import EpisodeItem from "../EpisodeItem";
import EpisodeContext from "../../EpisodeContext";
// Mock the `setSelectedEpisode` function
const mockSetSelectedEpisode = jest.fn();
describe("EpisodeItem Component", () => {
  const episode = {
    episode_id: 1,
    title: "Episode I: The Phantom Menace",
    release_date: "1999-05-19",
  };

  render(
    <EpisodeContext.Provider
      value={{ setSelectedEpisode: mockSetSelectedEpisode }}
    >
      <EpisodeItem episode={episode} />
    </EpisodeContext.Provider>
  );
  it("renders episode details correctly", () => {
    render(<EpisodeItem episode={episode} />);

    // Check that episode details are displayed
    // expect(screen.getAllByText("Episode: 1")).toBeInTheDocument();
    expect(
      screen.getAllByText(/Episode I: The Phantom Menace/i)[0]
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/Release Date: 1999-05-19/i)[0]
    ).toBeInTheDocument();
  });
});
