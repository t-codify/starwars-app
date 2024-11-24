import { useState, useEffect } from "react";

const useCalculateAvgRating = (ratings) => {
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (ratings && Array.isArray(ratings) && ratings.length > 0) {
      const normalizedRatings = ratings.map((rating) => {
        const value = rating.Value;

        if (value.includes("/100")) {
          return parseFloat(value.split("/")[0]) / 10;
        } else if (value.includes("%")) {
          return parseFloat(value.replace("%", "")) / 10;
        } else if (value.includes("/10")) {
          return parseFloat(value.split("/")[0]);
        } else {
          return 0;
        }
      });

      const sum = normalizedRatings.reduce(
        (total, rating) => total + rating,
        0
      );
      const avg = sum / normalizedRatings.length;

      setAverageRating(Math.round(avg * 10) / 10);
    } else {
      setAverageRating(0);
    }
  }, [ratings]);

  return averageRating;
};

export default useCalculateAvgRating;
