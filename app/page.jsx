import BookCard from "../components/BookCard/BookCard";
import BookCardGrid from "../components/BookCardGrid/BookCardGrid";
import fetchBooks from "./hooks/fetchBooks";

export default async function HomePage() {
  const { data: booksData } = await fetchBooks();

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
        Featured Books
      </h2>
      <BookCardGrid>
        {booksData?.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </BookCardGrid>
    </>
  );
}
