import booksData from "../../mocks/books.json";
import BookCard from "../../components/BookCard/BookCard";
import BookCardGrid from "../../components/BookCardGrid/BookCardGrid";

function BookOverviewPage() {
  return (
    <>
      <h1 className="text-center text-5xl leading-tight font-sevillana">
        Welcome to Bookie
      </h1>
      <div className="text-center max-w-2xl mx-auto p-8">
        <p className="text-xl mb-4 font-semibold text-green-600">
          Your personal reading companion awaits!
        </p>
        <p className="text-base">
          Rate your favorites, discover new adventures, and keep track of all
          those books you swear you'll get to... someday. Because let's be
          honest, we all have that one shelf that's practically bursting!
        </p>
        <p className="text-lg mb-6 italic text-gray-700">
          "A room without books is like a body without a soul" - Cicero
        </p>
        <img
          src="/front-page.png"
          alt="Image of drawn books"
          className="h-auto w-screen bg-none bg-transparent"
        />
      </div>
      <h2 className="text-2xl font-bold mb-6">Featured Books</h2>
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
