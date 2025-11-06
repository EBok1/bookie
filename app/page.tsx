import BookCard from "../components/BookCard/BookCard";
import BookCardGrid from "../components/BookCardGrid/BookCardGrid";
import { FloatingButton } from "../components/FloatingButton/FloatingButton";
import { supabase } from "./supabaseClient";
import Image from "next/image";

type Reviews = {
  id: string;
  reviewer: string;
  comment: string;
  rating: number;
  book_id: string;
};

// Force dynamic rendering - fetch fresh data on every request
export const dynamic = "force-dynamic";

export default async function HomePage() {
  if (!supabase) {
    return <div>Error: Database connection not available</div>;
  }

  // Fetch books directly from Supabase (server-side)
  const { data: booksData } = await supabase.from("books").select();

  // Fetch all comments directly from Supabase (server-side)
  const { data: allReviewsData } = await supabase.from("comments").select();

  const reviewsByBook = (allReviewsData || []).reduce(
    (accumulator, currentValue) => {
      const bookId = currentValue.book_id;
      if (!accumulator[bookId]) {
        accumulator[bookId] = [];
      }
      accumulator[bookId].push(currentValue);
      return accumulator;
    },
    {}
  );

  const enhancedBooksData = (booksData || []).map((book) => {
    const bookReviews = reviewsByBook[book.id] || [];

    let averageRating;
    if (bookReviews.length === 0) {
      averageRating = "Not available";
    } else {
      const sum = bookReviews.reduce(
        (accumulator: number, currentValue: Reviews) =>
          accumulator + currentValue.rating,
        0
      );
      averageRating = Math.round((sum / bookReviews.length) * 10) / 10;
    }
    return { ...book, calculatedAverage: averageRating };
  });

  return (
    <>
      <div className="md:flex md:mx-4 lg:mx-12 md:items-center md:mt-5 md:mb-0 text-center mt-7 mb-7 2xl:justify-center">
        <div>
          <h1 className="text-[2.5rem] leading-tight font-playfair mb-4 mx-4">
            Welcome to Bookie
          </h1>

          <div className="max-w-2xl mx-auto px-8">
            <p className="text-xl mb-4 font-semibold text-[#A55A16]">
              Your personal reading companion awaits!
            </p>
            <p className="text-base">
              Rate your favorites, discover new adventures, and keep track of
              all those books you swear you&apos;ll get to... someday. Because
              let&apos;s be honest, we all have that one shelf that&apos;s
              practically bursting!
            </p>
            <p className="text-lg mb-6 italic text-gray-700 mt-4">
              &ldquo;A room without books is like a body without a soul&rdquo; -
              Cicero
            </p>
          </div>
        </div>
        <Image
          src="/front-page.png"
          alt="Image of drawn books"
          width={800}
          height={600}
          className="h-auto w-screen md:w-[60%] hidden md:block xl:w-[58%] 2xl:w-[40%]"
          priority
        />
      </div>
      <h2 className="text-2xl font-bold mt-6 mb-2 mx-4 flex justify-center font-playfair">
        All Books
      </h2>
      <BookCardGrid>
        {enhancedBooksData?.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </BookCardGrid>
      <FloatingButton>+Add Book</FloatingButton>
    </>
  );
}
