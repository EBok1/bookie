"use client";
import { useState, useEffect } from "react";
import BookCard from "../../components/BookCard/BookCard";
import BookCardGrid from "../../components/BookCardGrid/BookCardGrid";
import { useFavorites } from "../../components/FavoriteButton/hooks/useFavorites";

function FavoritesList() {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const { getAllFavorites } = useFavorites();

  useEffect(() => {
    setFavoriteBooks(getAllFavorites());
  }, []);

  return (
    <>
      <div className="mt-10">
        <BookCardGrid>
          {favoriteBooks.length > 0 ? (
            favoriteBooks.map((book) => <BookCard key={book.id} book={book} />)
          ) : (
            <p>
              No favorite books yet! Start liking some books to see them here.
            </p>
          )}
        </BookCardGrid>
      </div>
    </>
  );
}

export default FavoritesList;
