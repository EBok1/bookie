import BookReview from "../../../components/BookReview/BookReview";
import ReturnButton from "../../../components/ReturnButton/ReturnButton";
import BookDetails from "../../../components/BookDetails/BookDetails";
import BookTag from "../../../components/BookTag/BookTag";
import { AverageBookRating } from "../../../components/AverageBookRating/AverageBookRating";
import Image from "next/image";
import { BookActions } from "../../../components/BookActions/BookActions";
import { supabase } from "../../supabaseClient";

// Force dynamic rendering - fetch fresh data on every request
export const dynamic = "force-dynamic";

export default async function BookDetailPage(props: { params: Promise<{ id: string }> } ) {
  if (!supabase) {
    return <div>Error: Database connection not available</div>;
  }
  
  const { id } = await props.params;

  // Fetch book directly from Supabase (server-side)
  const { data: bookDataArray } = await supabase
    .from("books")
    .select()
    .eq("id", id);
  const bookData =
    bookDataArray && bookDataArray.length > 0 ? bookDataArray[0] : null;

  // Fetch comments directly from Supabase (server-side)
  const { data: reviewData } = await supabase
    .from("comments")
    .select()
    .eq("book_id", id);

  let averageRating;
  if (!reviewData || reviewData.length === 0) {
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

            <div className="mt-2">
              <span>
                <BookTag tag={bookData.genre} variant="orange" />
              </span>
            </div>

            <BookActions bookData={bookData} />

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
                  .map((tag: string, index: number) => (
                    <BookTag
                      key={index}
                      tag={tag}
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

        <BookReview reviewData={reviewData || []} />
      </div>
    </>
  );
}
