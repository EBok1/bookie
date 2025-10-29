"use client";
import { useState } from "react";
import { updateBook, deleteBook } from "../utils/bookApi";

export function useBookManagement(bookData, router) {
  const [editBook, setEditBook] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [editMessage, setEditMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  function startEditing(book) {
    setEditBook(book.id);
    setEditValues({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      genre: book.genre,
      description: book.description,
      publishedYear: book.publishedYear,
      language: book.language,
    });
  }

  function cancelEditing() {
    setEditBook(null);
    setEditValues({});
  }

  async function saveEdit(bookId) {
    try {
      const result = await updateBook(bookId, editValues);
      console.log("✅ Save edit result:", { result });
      if (result.error) {
        console.error("❌ Save edit Supabase error:", result.error);
        setEditMessage("Something went wrong. Please try again.");
        return;
      }

      setEditMessage("Book updated successfully!");
      setEditBook(null);
      setEditValues({});

      router.refresh();
      setTimeout(() => setEditMessage(""), 5000);
    } catch (err) {
      console.error("❌ Save edit catch error:", err);
      setEditMessage("Something went wrong. Please try again.");
    }
  }

  async function handleDeleteBook(bookId) {
    const result = await deleteBook(bookId);
    if (result.error) {
      setDeleteMessage("Something went wrong. Please try again.");
      return;
    }

    setDeleteMessage("Book is deleted succesfully.");
    router.push("/"); 
    setTimeout(() => setDeleteMessage(""), 5000);
  }

  return {
    editBook, 
    editValues,
    setEditValues,
    editMessage, 
    deleteMessage,
    startEditing, 
    cancelEditing, 
    saveEdit, 
    handleDeleteBook,
  };
}
