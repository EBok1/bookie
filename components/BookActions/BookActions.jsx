"use client";
import { useRouter } from "next/navigation";
import { useBookManagement } from "./hooks/useBookManagement";

export const BookActions = ({ bookData }) => {
  const router = useRouter();
  const {
    editBook,
    editValues,
    setEditValues,
    editMessage,
    deleteMessage,
    startEditing,
    cancelEditing,
    saveEdit,
    handleDeleteBook,
  } = useBookManagement(bookData, router);

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
      ) : null}

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
