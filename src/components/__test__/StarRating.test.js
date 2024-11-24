import { render, screen } from "@testing-library/react";

import StarRatingComponent from "../StarRatingComponent";
describe("StarRating Component", () => {
  it("renders the correct number of full, half, and empty stars", () => {
    const { rerender } = render(<StarRatingComponent averageRating={6.5} />);

    // 6 full stars
    expect(screen.getAllByTestId("full-star")).toHaveLength(6);

    // 1 half star
    expect(screen.getAllByTestId("half-star")).toHaveLength(1);

    // 3 empty stars (10 - (6 full + 1 half))
    expect(screen.getAllByTestId("empty-star")).toHaveLength(3);

    // Re-render with a different rating (e.g., 9.3)
    rerender(<StarRatingComponent averageRating={9.3} />);

    // 9 full stars
    expect(screen.getAllByTestId("full-star")).toHaveLength(9);

    // 1 empty star (no half star)
    expect(screen.getAllByTestId("half-star")).toHaveLength(1);
  });
});
