"use client";
import { useRouter } from "next/navigation";
import { useBookManagement } from "./hooks/useBookManagement";
import { BookEditForm } from "../BookEditForm/BookEditForm";
import { BookActionButtons } from "../BookActionButtons/BookActionButtons";
import type { BookData } from "@/app/types/bookData";

type BookActionsProps = {
  bookData: BookData;
};

export const BookActions = ({ bookData }: BookActionsProps) => {
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
      {editMessage && (
        <p className="text-green-600 text-sm mb-4 font-medium">{editMessage}</p>
      )}
      {deleteMessage && (
        <p className="text-red-600 text-sm mb-4 font-medium">{deleteMessage}</p>
      )}

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
