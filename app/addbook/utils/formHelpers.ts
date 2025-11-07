type CreateBookObjectProps = {
title: string; 
author: string; 
genre: string;
isbn: string; 
language: string; 
publishedYear: string; 
description: string; 
}

export const createBookObject = ({
  title,
  author,
  genre,
  isbn,
  language,
  publishedYear,
  description,
}: CreateBookObjectProps) => {
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
