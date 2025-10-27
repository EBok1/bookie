export const createBookObject = ({
  title,
  author,
  genre,
  isbn,
  language,
  publishedYear,
  description,
}) => {
  const date = new Date().toLocaleDateString("nl-NL");

  return {
    title: title,
    author: author,
    genre: genre,
    isbn: isbn,
    coverImageUrl: "/logo.png",
    language: language,
    publishedYear: publishedYear,
    description: description,
    format: "paperback",
    pages: 0,
    publisher: "Unknown",
    tags: "",
    rating: null,
    status: "read",
    dateAdded: date,
    id: Date.now(),
  };
};

export const clearFormFields = () => ({
  title: "",
  author: "",
  genre: "",
  isbn: "",
  language: "",
  publishedYear: "",
  description: "",
  coverImage: null,
});
