import { Link } from "react-router-dom";
import LikeButton from "../FavoriteButton/FavoriteButton";
import FallbackImage from "../FallbackImage/FallbackImage";

function BookCard({ book }) {
  return (
    <>
      <Link
        key={book.id}
        to={`/book/${book.id}`}
        className="border rounded-lg p-4 shadow-md bg-[#fffdf6]"
      >
        <FallbackImage book={book} />
        <h3 className="font-bold text-xl mb-4 justify-center font-playfair">
          {book.title}
        </h3>
        <p className="text-gray-600 mt-4 mb-2">{book.author}</p>
        <div className="flex">
          <p className="bg-[#bccdbc] px-3 py-1 mb-4 rounded-full text-sm font-medium">
            {book.genre}
          </p>
          <LikeButton book={book} />
        </div>
      </Link>
    </>
  );
}

export default BookCard;
