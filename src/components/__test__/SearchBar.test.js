import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar";
import EpisodeContext from "../../EpisodeContext";
describe("SearchBar Component", () => {
  const mockEpisodeData = [
    {
      title: "Episode I: The Phantom Menace",
      release_date: "1999-05-19",
      episode_id: 1,
    },
    {
      title: "Episode II: Attack of the Clones",
      release_date: "2002-05-16",
      episode_id: 2,
    },
    {
      title: "Episode III: Revenge of the Sith",
      release_date: "2005-05-19",
      episode_id: 3,
    },
  ];

  const renderSearchBar = (contextValue) => {
    return render(
      <EpisodeContext.Provider value={contextValue}>
        <SearchBar />
      </EpisodeContext.Provider>
    );
  };

  it("renders search input and buttons", () => {
    renderSearchBar({
      episodeData: mockEpisodeData,
      setFilteredData: jest.fn(),
      filteredData: mockEpisodeData,
    });

    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("filters episodes based on search input", () => {
    const setFilteredData = jest.fn();
    renderSearchBar({
      episodeData: mockEpisodeData,
      setFilteredData,
      filteredData: mockEpisodeData,
    });

    const input = screen.getByPlaceholderText("Search...");
    const searchButton = screen.getByText("Search");

    fireEvent.change(input, { target: { value: "Attack" } });
    fireEvent.click(searchButton);

    expect(setFilteredData).toHaveBeenCalledWith([
      {
        title: "Episode II: Attack of the Clones",
        release_date: "2002-05-16",
        episode_id: 2,
      },
    ]);
  });

  it("sorts episodes by selected option", () => {
    const setFilteredData = jest.fn();
    renderSearchBar({
      episodeData: mockEpisodeData,
      setFilteredData,
      filteredData: mockEpisodeData,
    });

    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "Most Recent" } });

    expect(setFilteredData).toHaveBeenCalledWith([
      {
        title: "Episode III: Revenge of the Sith",
        release_date: "2005-05-19",
        episode_id: 3,
      },
      {
        title: "Episode II: Attack of the Clones",
        release_date: "2002-05-16",
        episode_id: 2,
      },
      {
        title: "Episode I: The Phantom Menace",
        release_date: "1999-05-19",
        episode_id: 1,
      },
    ]);
  });

  it("handles empty search input gracefully", () => {
    const setFilteredData = jest.fn();
    renderSearchBar({
      episodeData: mockEpisodeData,
      setFilteredData,
      filteredData: mockEpisodeData,
    });

    const searchButton = screen.getByText("Search");

    fireEvent.click(searchButton);

    expect(setFilteredData).toHaveBeenCalledWith(mockEpisodeData);
  });
});
