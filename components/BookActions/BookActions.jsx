"use client";
import { useRouter } from "next/navigation";
import { useBookManagement } from "./hooks/useBookManagement";
import { BookEditForm } from "../BookEditForm/BookEditForm";
import { BookActionButtons } from "../BookActionButtons/BookActionButtons";

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
    <>ny other files that hat
      {editBook !== null ? (
        <>
          <BookEditForm
            editValues={editValues}
            onEditValuesChange={setEditValues}
          />
          <BookActionButtons
            editBook={editBook}
            bookData={bookData}
            onSave={saveEdit}
            onCancel={cancelEditing}
            onEdit={startEditing}
            onDelete={handleDeleteBook}
          />
        </>
      ) : (
        <>
          <BookActionButtons
            editBook={editBook}
            bookData={bookData}
            onSave={saveEdit}
            onCancel={cancelEditing}
            onEdit={startEditing}
            onDelete={handleDeleteBook}
          />
        </>
      )}
    </>
  );
};
