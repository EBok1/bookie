"use client";
import fetchBookById from "../../mocks/helpers";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BookReview from "../../../components/BookReview/BookReview";
import ReturnButton from "../../../components/ReturnButton/ReturnButton";
import BookDetails from "../../../components/BookDetails/BookDetails";
import BookTag from "../../../components/BookTag/BookTag";

function BookDetailPage() {
  const [bookData, setBookData] = useState(null);
  const params = useParams();

  useEffect(() => {
    if (params?.id) {
      const data = fetchBookById({ id: params.id });
      setBookData(data);
    }
  }, [params?.id]);

  if (!bookData) {
    return (
      <div className="p-4">
        <ReturnButton />
        <div className="flex justify-center items-center h-64">
          <p>Loading book details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <ReturnButton />
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Book Cover */}
        <div className="flex justify-center">
          <img
            src={bookData.coverImageUrl}
            alt={`Cover of ${bookData.title}`}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-800 font-playfair">
            {bookData.title}
          </h1>
          <h2 className="text-xl text-gray-600 mb-2">by {bookData.author}</h2>
          <span>
            <BookTag tag={bookData.genre} variant="orange" />
          </span>
          <h3 className="text-xl font-bold text-gray-800 mb-2 font-playfair">
            Description
          </h3>
          <p className="leading-relaxed mb-8">{bookData.description}</p>
          <BookDetails bookData={bookData} />
          <h3 className="text-xl font-bold text-gray-800 mt-8 mb-2 font-playfair">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {bookData.tags && bookData.tags.length > 0 ? (
              bookData.tags.map((tag, index) => (
                <BookTag
                  key={index}
                  tag={tag}
                  index={index}
                  variant="grey"
                  hashtag={true}
                />
              ))
            ) : (
              <p className="text-gray-500 text-sm">No tags available</p>
            )}
          </div>
        </div>
      </div>
      <BookReview />
    </div>
  );
}

export default BookDetailPage;
