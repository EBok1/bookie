import { useState, useEffect } from "react";
import BookCard from "../../components/BookCard/BookCard";
import BookCardGrid from "../../components/BookCardGrid/BookCardGrid";

function FavoritesList() {
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    const favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];
    setFavoriteBooks(favoritesArray);
  }, []);

  return (
    <>
    <BookCardGrid>
      {favoriteBooks.length > 0 ? (
        favoriteBooks.map((book) => <BookCard key={book.id} book={book} />)
      ) : (
        <p>No favorite books yet! Start liking some books to see them here.</p>
      )}
      </BookCardGrid>
    </>
  );
}

export default FavoritesList;
