import { useParams, Link } from 'react-router-dom';
import booksData from '../../books.json';

function BookDetails() {
    const { id } = useParams();
    const book = booksData.find(book => book.id === id);

    if (!book) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Book Not Found</h1>
                <Link to="/" className="text-blue-600 hover:underline">
                    ← Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
                ← Back to Home
            </Link>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/3">
                        <img 
                            src={book.coverImageUrl} 
                            alt={`Cover of ${book.title}`}
                            className="w-full h-96 object-cover"
                        />
                    </div>
                    
                    <div className="md:w-2/3 p-6">
                        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                        <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
                        
                        <div className="flex flex-wrap gap-4 mb-4">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                {book.genre}
                            </span>
                            <span className="text-yellow-500 flex items-center">
                                ⭐ {book.rating}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                                book.status === 'read' ? 'bg-green-100 text-green-800' :
                                book.status === 'reading' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                                {book.status}
                            </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                            <div><strong>Published:</strong> {book.publishedYear}</div>
                            <div><strong>Pages:</strong> {book.pages}</div>
                            <div><strong>Publisher:</strong> {book.publisher}</div>
                            <div><strong>Format:</strong> {book.format}</div>
                            <div><strong>Language:</strong> {book.language}</div>
                            <div><strong>ISBN:</strong> {book.isbn}</div>
                        </div>
                        
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">Description</h3>
                            <p className="text-gray-700 leading-relaxed">{book.description}</p>
                        </div>
                        
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {book.tags.map((tag, index) => (
                                    <span 
                                        key={index} 
                                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                        <p className="text-sm text-gray-500">Added to library: {book.dateAdded}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookDetails;