"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const BookActions = ({ bookData }) => {
  const [editBook, setEditBook] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [editMessage, setEditMessage] = useState("");
  const router = useRouter();
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
      const response = await fetch(`/api/books/${bookId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editValues),
      });
      const result = await response.json();
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
    const response = await fetch(`/api/books/${bookId}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (result.error) {
      setDeleteMessage("Something went wrong. Please try again.");
      return;
    }

    setDeleteMessage("Book is deleted succesfully.");
    router.push("/"); // Refresh to update average rating
    setTimeout(() => setDeleteMessage(""), 5000);
  }

  return (
    <>
      {editBook !== null ? (
        <>
          <input
            type="text"
            value={editValues.title}
            onChange={(e) =>
              setEditValues({
                ...editValues,
                title: e.target.value,
              })
            }
            className="w-full rounded-md my-2 p-1 border-[#bccdbc] border-2"
          />

          <input
            type="text"
            value={editValues.author}
            onChange={(e) =>
              setEditValues({
                ...editValues,
                author: e.target.value,
              })
            }
            className="w-full rounded-md mb-2 p-1 border-[#bccdbc] border-2"
          />

          <input
            type="text"
            value={editValues.isbn}
            onChange={(e) =>
              setEditValues({
                ...editValues,
                isbn: e.target.value,
              })
            }
            className="w-full rounded-md mb-2 p-1 border-[#bccdbc] border-2"
          />

          <input
            type="text"
            value={editValues.genre}
            onChange={(e) =>
              setEditValues({
                ...editValues,
                genre: e.target.value,
              })
            }
            className="w-full rounded-md mb-2 p-1 border-[#bccdbc] border-2"
          />

          <input
            type="text"
            value={editValues.description}
            onChange={(e) =>
              setEditValues({
                ...editValues,
                description: e.target.value,
              })
            }
            className="w-full rounded-md mb-2 p-1 border-[#bccdbc] border-2"
          />

          <input
            type="text"
            value={editValues.publishedYear}
            onChange={(e) =>
              setEditValues({
                ...editValues,
                publishedYear: e.target.value,
              })
            }
            className="w-full rounded-md mb-2 p-1 border-[#bccdbc] border-2"
          />

          <input
            type="text"
            value={editValues.language}
            onChange={(e) =>
              setEditValues({
                ...editValues,
                language: e.target.value,
              })
            }
            className="w-full rounded-md mb-2 p-1 border-[#bccdbc] border-2"
          />
        </>
      ) : null }

      {editBook !== null ? (
        <>
          <div className="mb-1">
            <button
              onClick={() => saveEdit(bookData.id)}
              className="bg-[#bccdbc] text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1 m-1"
            >
              Save
            </button>
            <button
              onClick={() => cancelEditing()}
              className="bg-[#f1a9ae] text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1 m-1"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => startEditing(bookData)}
            className="bg-[#bccdbc] text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1 mt-3 mb-2 mr-2"
          >
            Edit
          </button>

          <button
            popoverTarget={`delete-popover-${bookData.id}`}
            className="bg-[#f1a9ae] text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1"
          >
            Delete
          </button>
          <div
            popover="auto"
            id={`delete-popover-${bookData.id}`}
            className="border border-gray-300 bg-gray-100 rounded-md p-4 w-auto h-80 mx-9 shadow-md bg-opacity-90"
          >
            <p className="flex justify-center">
              Are you sure you want to delete this book?
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handleDeleteBook(bookData.id)}
                className="bg-[#f1a9ae] text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1"
              >
                Delete
              </button>
              <button
                popoverTarget={`delete-popover-${bookData.id}`}
                popoverTargetAction="hide"
                onClick={() => cancelEditing()}
                className="bg-white text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1 ml-5"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
