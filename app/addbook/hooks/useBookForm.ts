import { useState } from "react";

type BookFormData = {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  language: string;
  publishedYear: string;
  description: string;
  coverImage: File | null;
};

export const useBookForm = () => {
  const [bookFormData, setBookFormData] = useState<BookFormData>({
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
