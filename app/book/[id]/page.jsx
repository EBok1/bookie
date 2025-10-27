import fetchBookCommentsById from "../../hooks/fetchBookCommentsById";
import BookReview from "../../../components/BookReview/BookReview";
import ReturnButton from "../../../components/ReturnButton/ReturnButton";
import BookDetails from "../../../components/BookDetails/BookDetails";
import BookTag from "../../../components/BookTag/BookTag";
import { AverageBookRating } from "../../../components/AverageBookRating/AverageBookRating";
import Image from "next/image";

export default async function BookDetailPage(props) {
  const { id } = await props.params;
  const response = await fetch(`http://localhost:3000/api/books/${id}`);
  const { data: bookData } = await response.json();
  const { data: reviewData } = await fetchBookCommentsById(id);

  let averageRating;
  if (reviewData.length === 0) {
    averageRating = "No average rating.";
  } else {
    const sum = reviewData.reduce(
      (accumulator, currentValue) => accumulator + currentValue.rating,
      0
    );
    averageRating = Math.round((sum / reviewData.length) * 10) / 10;
  }

  if (!bookData.title) {
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
    <>
      {/* <Navigation /> */}
      <div className="p-4">
        <ReturnButton />
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Book Cover */}
          <div className="w-full max-w-sm mx-auto my-auto">
            <Image
              src={bookData.coverImageUrl}
              alt={`Cover of ${bookData.title}`}
              width={400}
              height={600}
              className="rounded-lg shadow-lg w-full h-auto"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-800 font-playfair">
              {bookData.title}
            </h1>
            <h2 className="text-xl text-gray-600 mb-2">by {bookData.author}</h2>
            <AverageBookRating averageRating={averageRating} />
            <span>
              <BookTag tag={bookData.genre} variant="orange" />
            </span>
            <h3 className="text-xl font-bold text-gray-800 mb-2 font-playfair mt-8">
              Description
            </h3>
            <p className="leading-relaxed mb-8">{bookData.description}</p>
            <BookDetails bookData={bookData} />
            <h3 className="text-xl font-bold text-gray-800 mt-8 mb-2 font-playfair">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {bookData.tags && bookData.tags.split(",").length > 0 ? (
                bookData.tags
                  .split(",")
                  .map((tag, index) => (
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
        <BookReview reviewData={reviewData} />
      </div>
    </>
  );
}
