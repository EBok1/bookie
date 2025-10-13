import booksList from "./books.json";

const fetchBookById = ({id}) => {
    const foundBook = booksList.find((book) => book.id == id);
    return foundBook; 
}

export default fetchBookById;