import { useState, useCallback } from "react";

export const useGenres = () => {
  const [availableGenres, setAvailableGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(false);
  const [genresCache, setGenresCache] = useState(null);

  const fetchGenres = useCallback(async () => {
    try {
      setLoadingGenres(true);

      if (genresCache) {
        setAvailableGenres(genresCache);
        setLoadingGenres(false);
        return;
      }

      const response = await fetch('/api/genres');
      const result = await response.json();
      const uniqueGenres = result.genres;

      setAvailableGenres(uniqueGenres);
      setGenresCache(uniqueGenres);
    } catch (error) {
      console.error("Error fetching genres:", error);
      setAvailableGenres([]);
    } finally {
      setLoadingGenres(false);
    }
  }, [genresCache]);

  return {
    availableGenres,
    loadingGenres,
    fetchGenres,
  };
};