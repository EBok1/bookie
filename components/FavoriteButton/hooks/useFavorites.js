"use client";
import { useState, useEffect } from "react";

export function useFavorites(book = null) {
  const [liked, setLiked] = useState(false); // creates state: liked is current value, starts at false. setLiked: fucntion to update state

  const toggleLike = () => {
    if (!book) return;
    // Get the current favorites from localStorage as a string (or null if empty)
    const storedFavorites = localStorage.getItem("favorites");

    // Convert the string to an array, or create empty array if nothing stored
    const favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];

    // Check if the current book is already in the favorites array by comparing IDs
    const isAlreadyFavorited = favoritesArray.some(
      (favBook) => favBook.id === book.id
    );

    if (isAlreadyFavorited) {
      // Book is already favorited → REMOVE it from favorites
      // Create new array WITHOUT the current book (filter out books that match current book's ID)
      const updatedFavorites = favoritesArray.filter(
        (favBook) => favBook.id !== book.id
      );
      // Save the updated array back to localStorage as a string
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      // Set the heart button to empty (not liked)
      setLiked(false);
    } else {
      // Book is NOT favorited → ADD it to favorites
      // Create new array with all existing favorites PLUS the current book
      const updatedFavorites = [...favoritesArray, book];
      // Save the updated array back to localStorage as a string
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      // Set the heart button to filled (liked)
      setLiked(true);
    }
  };

  useEffect(() => {
    if (!book) return;
    // Get the favorites data from localStorage as a string (or null if nothing saved)
    const storedFavorites = localStorage.getItem("favorites");

    // Convert the string back to an array, or create empty array if nothing was stored
    const favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];

    // Check if the current book is already in the favorites array by comparing IDs
    const isBookFavorited = favoritesArray.some(
      (favBook) => favBook.id === book.id
    );

    // Set the liked button state based on whether book is already favorited
    setLiked(isBookFavorited);
  }, [book]); // Re-run this effect whenever the book.id changes (different book)

  const getAllFavorites = () => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  };

  return {
    liked,
    toggleLike,
    getAllFavorites,
  };
}
