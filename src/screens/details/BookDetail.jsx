import { useParams } from "react-router-dom";
import booksData from "../../books.json";

function BookDetail() {
  const { id } = useParams();
  
  // Find the specific book by ID
  const book = booksData.find(book => book.id === id);
  
  // If book not found, show error message
  if (!book) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-red-600">Book Not Found</h1>
        <p className="text-gray-600 mt-4">The book you're looking for doesn't exist.</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Book Cover */}
        <div className="flex justify-center">
          <img 
            src={book.coverImageUrl} 
            alt={`Cover of ${book.title}`}
            className="max-w-full h-auto max-h-96 rounded-lg shadow-lg"
          />
        </div>
        
        {/* Book Details */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">{book.title}</h1>
          <p className="text-xl text-gray-600">by {book.author}</p>
          
          <div className="flex items-center space-x-4">
            <span className="text-2xl text-yellow-500">⭐ {book.rating}</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {book.status}
            </span>
          </div>
          
          <div className="space-y-2">
            <p><span className="font-semibold">Genre:</span> {book.genre}</p>
            <p><span className="font-semibold">Pages:</span> {book.pages}</p>
            <p><span className="font-semibold">Published:</span> {book.publishedYear}</p>
            <p><span className="font-semibold">Publisher:</span> {book.publisher}</p>
            <p><span className="font-semibold">Language:</span> {book.language}</p>
            <p><span className="font-semibold">Format:</span> {book.format}</p>
          </div>
          
          <div className="pt-4">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{book.description}</p>
          </div>
          
          <div className="pt-4">
            <h3 className="text-xl font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {book.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="pt-6 space-x-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors">
              Like ❤️
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors">
              Mark as Read
            </button>
          </div>
          
          {/* Review Section */}
          <div className="pt-6">
            <h3 className="text-xl font-semibold mb-2">Leave a Review</h3>
            <textarea 
              placeholder="Write your review here..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24"
            ></textarea>
            <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;