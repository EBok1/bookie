import booksData from "../../mocks/books.json";
import BookCard from "../../components/BookCard/BookCard";
import BookCardGrid from "../../components/BookCardGrid/BookCardGrid";

function BookOverviewPage() {
  return (
    <>
      <div className="mt-4 md:flex md:mx-4 lg:mx-12">
        <div>
          <h1 className="text-center text-[2.5rem] leading-tight font-playfair mb-4 mx-4">
            Welcome to Bookie
          </h1>

          <div className="text-center max-w-2xl mx-auto px-8">
            <p className="text-xl mb-4 font-semibold text-[#A55A16]">
              Your personal reading companion awaits!
            </p>
            <p className="text-base">
              Rate your favorites, discover new adventures, and keep track of
              all those books you swear you'll get to... someday. Because let's
              be honest, we all have that one shelf that's practically bursting!
            </p>
            <p className="text-lg mb-6 italic text-gray-700 mt-4">
              "A room without books is like a body without a soul" - Cicero
            </p>
          </div>
        </div>
        <img
          src="/front-page.png"
          alt="Image of drawn books"
          className="h-auto w-screen md:w-[60%] hidden md:block"
        />
      </div>
      <h2 className="text-2xl font-bold mt-6 mb-2 mx-4 flex justify-center font-playfair">
        Featured Books
      </h2>
      <BookCardGrid>
        {booksData.map((book) => (
          <BookCard key={book.id} book={book} />
          //key helps react track each item in the list //book=book passing data to bookcard as prop. first book is prop, second is from .map fucntion
        ))}
      </BookCardGrid>
    </>
  );
}

export default BookOverviewPage;
