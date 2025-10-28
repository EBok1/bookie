import BookCard from "../components/BookCard/BookCard";
import BookCardGrid from "../components/BookCardGrid/BookCardGrid";
import { FloatingButton } from "../components/FloatingButton/FloatingButton";

export default async function HomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/books`);
  const { data: booksData } = await response.json();
  const commentsResponse = await fetch(`${baseUrl}/api/comments`);
  const { data: allReviewsData } = await commentsResponse.json();

  const reviewsByBook = allReviewsData.reduce((accumulator, currentValue) => {
    const bookId = currentValue.book_id;
    if (!accumulator[bookId]) {
      accumulator[bookId] = [];
    }
    accumulator[bookId].push(currentValue);
    return accumulator;
  }, {});

  const enhancedBooksData = booksData.map((book) => {
    const bookReviews = reviewsByBook[book.id] || [];

    let averageRating;
    if (bookReviews.length === 0) {
      averageRating = "Not available";
    } else {
      const sum = bookReviews.reduce(
        (accumulator, currentValue) => accumulator + currentValue.rating,
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
        <img
          src="/front-page.png"
          alt="Image of drawn books"
          className="h-auto w-screen md:w-[60%] hidden md:block xl:w-[58%] 2xl:w-[40%]"
        />
      </div>
      <h2 className="text-2xl font-bold mt-6 mb-2 mx-4 flex justify-center font-playfair">
        All Books
      </h2>
      <BookCardGrid>
        {enhancedBooksData?.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            averageRating={book.calculatedAverage}
          />
        ))}
      </BookCardGrid>
      <FloatingButton>+Add Book</FloatingButton>
    </>
  );
}
