import { useState } from 'react';
import booksData from '../../books.json';

function Books() {
    // State to track which books are liked (by their IDs)
    const [likedBooks, setLikedBooks] = useState([]);

    // Toggle like status for a book
    const handleLikeToggle = (bookId) => {
        if (likedBooks.includes(bookId)) {
            // Book is already liked - remove it (unlike)
            setLikedBooks(likedBooks.filter(id => id !== bookId));
        } else {
            // Book is not liked - add it (like)
            setLikedBooks([...likedBooks, bookId]);
        }
    };
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Featured Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {booksData.map((book) => (
                    <a key={book.id} className="border rounded-lg p-4 shadow-md">
                        <h3 className="font-bold text-lg">{book.title}</h3>
                        <img src={book.coverImageUrl} alt="Image of bookcover"/>
                        <p className="text-gray-600">by {book.author}</p>
                        <p className="text-sm text-blue-600">{book.genre}</p>
                        <div className="mt-2">
                            <span className="text-yellow-500">⭐ {book.rating}</span>
                            <span className="ml-2 text-sm text-gray-500">({book.status})</span>
                        </div>
                        
                        {/* Like button with toggle functionality */}
                        <button 
                            onClick={() => handleLikeToggle(book.id)}
                            className="mt-3 w-full"
                        >
                            <div className={`p-2 rounded transition-colors ${
                                likedBooks.includes(book.id) 
                                    ? 'bg-red-500 text-white' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}>
                                {likedBooks.includes(book.id) ? 'Liked' : 'Like'} 
                                <span className="ml-1">❤️</span>
                            </div>
                        </button>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default Books;