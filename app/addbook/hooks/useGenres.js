import { useState } from "react";
import { supabase } from "../../../app/supabaseClient";

export const useGenres = () => {
  const [availableGenres, setAvailableGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(false);
  const [genresCache, setGenresCache] = useState(null);

  const fetchGenres = async () => {
    try {
      setLoadingGenres(true);

      if (genresCache) {
        setAvailableGenres(genresCache);
        setLoadingGenres(false);
        return;
      }

      const { data: booksData, error } = await supabase
        .from("books")
        .select("genre");

      if (error) throw error;

      const uniqueGenres = [...new Set(booksData.map((book) => book.genre))]
        .filter((genre) => genre)
        .sort();

      setAvailableGenres(uniqueGenres);
      setGenresCache(uniqueGenres);
    } catch (error) {
      console.error("Error fetching genres:", error);
      setAvailableGenres([]);
    } finally {
      setLoadingGenres(false);
    }
  };

  return {
    availableGenres,
    loadingGenres,
    fetchGenres,
  };
};