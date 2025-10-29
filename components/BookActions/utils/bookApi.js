export async function updateBook(bookId, bookData) {
    const response = await fetch(`/api/books/${bookId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });
      const newResult = await response.json();
      return newResult;
  }
  
  export async function deleteBook(bookId) {
    const response = await fetch(`/api/books/${bookId}`, {
        method: "DELETE",
      });
      const newResult = await response.json();
      return newResult;
  }