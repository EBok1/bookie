import { useParams } from "react-router";
import fetchBookById from "../../mocks/helpers";
import { useEffect, useState } from "react";
import BookReview from "../../components/BookReview/BookReview";
import ReturnButton from "../../components/ReturnButton/ReturnButton";

function BookDetailPage() {
  const params = useParams();
  const [bookData, setBookData] = useState({});

  useEffect(() => {
    const data = fetchBookById({ id: params.id });
    setBookData(data);
  }, [params.id]);

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
          <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 mb-8 rounded-full text-sm font-medium">
            {bookData.genre}
          </span>
          <h3 className="text-xl font-bold text-gray-800 mb-2 font-playfair">
            Description
          </h3>
          <p className="leading-relaxed mb-8">{bookData.description}</p>

          <h3 className="text-xl font-bold text-gray-800 mb-2 font-playfair">
            Book Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Published Year
              </dt>
              <dd className="text-gray-900">{bookData.publishedYear}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Pages</dt>
              <dd className="text-gray-900">{bookData.pages}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Publisher</dt>
              <dd className="text-gray-900">{bookData.publisher}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Language</dt>
              <dd className="text-gray-900">{bookData.language}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Format</dt>
              <dd className="text-gray-900">{bookData.format}</dd>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mt-8 mb-2 font-playfair">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {bookData.tags && bookData.tags.length > 0 ? (
              bookData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                >
                  #{tag}
                </span>
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
