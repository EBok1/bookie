import Link from "next/link";
import LikeButton from "../FavoriteButton/FavoriteButton";
import FallbackImage from "../FallbackImage/FallbackImage";
import BookTag from "../BookTag/BookTag";
import { AverageBookRating } from "../AverageBookRating/AverageBookRating";

function BookCard({ book }) {
  return (
    <>
      <Link
        key={book.id}
        href={`/book/${book.id}`}
        className="border rounded-lg p-4 shadow-md bg-[#fffdf6]"
      >
        <FallbackImage book={book} />
        <h3 className="font-bold text-xl justify-center font-playfair">
          {book.title}
        </h3>
        <p className="text-gray-600 mb-2">{book.author}</p>
        <AverageBookRating averageRating={book.calculatedAverage}/>
        <div className="flex justify-between flex-wrap gap-4 mt-4">
          <p>
            <BookTag tag={book.genre} variant="orange" />
          </p>
          <LikeButton book={book} />
        </div>
      </Link>
    </>
  );
}

export default BookCard;
