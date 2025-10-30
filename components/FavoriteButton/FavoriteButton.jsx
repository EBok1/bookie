"use client";
import { useFavorites } from "./hooks/useFavorites";

function LikeButton({ book }) {
  const { liked, toggleLike } = useFavorites(book);
  return (
    <button
      key={book.id}
      onClick={(e) => {
        // when button is clicked run this function
        e.stopPropagation(); // stops event bubbling (prevents click from traveling up)
        e.preventDefault(); // prevents browser default behaviour
        toggleLike(); // toggle like status
      }}
      className={`like-button ${liked ? "liked" : ""}`} // always had like-button class. if liked is true also add liked class. if liked is false add empty string (nothing)
    >
      {liked ? "❤️ Added to favorites!" : "♡ Add to favorites"}
    </button>
  );
}

export default LikeButton;
