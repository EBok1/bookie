import { useState } from "react";

export const useBookForm = () => {
  const [bookFormData, setBookFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    language: "",
    publishedYear: "",
    description: "",
    coverImage: null,
  });

  return {
    bookFormData,
    setBookFormData,
  };
};
