import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LikeButton from "../FavoriteButton/FavoriteButton";
import BookReview from "../BookReview/BookReview";

function BookCard({ book }) {
  const [rating, setRating] = useState(0);
  return (
    <>
      <Link
        key={book.id}
        to={`/book/${book.id}`}
        className="border rounded-lg p-4 shadow-md"
      >
        Home
        <h3 className="font-bold text-lg">{book.title}</h3>
        <img src={book.coverImageUrl} alt="Image of bookcover" className="w-auto h-auto bg-slate-400"/>
        <p className="text-gray-600">by {book.author}</p>
        <p className="text-sm text-blue-600">{book.genre}</p>
        <BookReview rating={rating} setRating={setRating} />
        <LikeButton book={book} />
      </Link>
    </>
  );
}

export default BookCard;
