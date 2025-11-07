import type { EditValues } from "@/app/types/editValues";

export async function updateBook(bookId: string, bookData: EditValues) {
    const response = await fetch(`/api/books/${bookId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });
      const newResult = await response.json();
      return newResult;
  }
  
  export async function deleteBook(bookId: string) {
    const response = await fetch(`/api/books/${bookId}`, {
        method: "DELETE",
      });
      const newResult = await response.json();
      return newResult;
  }