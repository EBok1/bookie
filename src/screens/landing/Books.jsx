import booksData from '../../books.json';
import { Link } from 'react-router-dom';

function Books() {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Featured Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {booksData.map((book) => (
                    <Link 
                        key={book.id} 
                        to={`/book/${book.id}`}
                        className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer block"
                    >
                        <h3 className="font-bold text-lg">{book.title}</h3>
                        <img src={book.coverImageUrl} alt="Image of bookcover"/>
                        <p className="text-gray-600">by {book.author}</p>
                        <p className="text-sm text-blue-600">{book.genre}</p>
                        <div className="mt-2">
                            <span className="text-yellow-500">⭐ {book.rating}</span>
                            <span className="ml-2 text-sm text-gray-500">({book.status})</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Books;