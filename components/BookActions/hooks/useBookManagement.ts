"use client";
import { useState } from "react";
import { updateBook, deleteBook } from "../utils/bookApi";
import type { BookData } from "@/app/types/bookData";
import type { useRouter } from "next/navigation";
type Router = ReturnType<typeof useRouter>;

export function useBookManagement( router: Router ) {
  const [editBook, setEditBook] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({});
  const [messages, setMessages] = useState({
    edit: "",
    delete: "",
  });

  function startEditing(book: BookData) {
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

  async function saveEdit(bookId: string) {
    try {
      const result = await updateBook(bookId, editValues);
      if (result.error) {
        console.error("❌ Save edit Supabase error:", result.error);
        setMessages({
          ...messages,
          edit: "Something went wrong. Please try again.",
        });
        return;
      }

      setMessages({ ...messages, edit: "Book updated successfully!" });
      setEditBook(null);
      setEditValues({});

      router.refresh();
      setTimeout(() => setMessages({ ...messages, edit: "" }), 5000);
    } catch (err) {
      console.error("❌ Save edit catch error:", err);
      setMessages({
        ...messages,
        edit: "Something went wrong. Please try again.",
      });
    }
  }

  async function handleDeleteBook(bookId: string) {
    const result = await deleteBook(bookId);
    if (result.error) {
      setMessages({
        ...messages,
        delete: "Something went wrong. Please try again.",
      });
      return;
    }

    setMessages({ ...messages, delete: "Book is deleted succesfully." });
    router.push("/");
    setTimeout(() => setMessages({ ...messages, delete: "" }), 5000);
  }

  return {
    editBook,
    editValues,
    setEditValues,
    editMessage: messages.edit,
    deleteMessage: messages.delete,
    startEditing,
    cancelEditing,
    saveEdit,
    handleDeleteBook,
  };
}
