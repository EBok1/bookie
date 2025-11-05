"use client";

import type { BookData } from "@/app/types/bookData";

type BookActionButtonsProps = {
  editBook: string | null;
  bookData: BookData;
  onSave: (id: string) => void;
  onCancel: () => void;
  onEdit: (bookData: BookData) => void;
  onDelete: (id: string) => void;
};

export function BookActionButtons({
  editBook,
  bookData,
  onSave,
  onCancel,
  onEdit,
  onDelete,
}: BookActionButtonsProps) {
  return (
    <>
      {editBook ? (
        <div className="mb-1">
          <button
            onClick={() => onSave(bookData.id)}
            className="bg-[#bccdbc] text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1 m-1"
          >
            Save
          </button>
          <button
            onClick={() => onCancel()}
            className="bg-[#f1a9ae] text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1 m-1"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={() => onEdit(bookData)}
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
                onClick={() => onDelete(bookData.id)}
                className="bg-[#f1a9ae] text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1"
              >
                Delete
              </button>
              <button
                popoverTarget={`delete-popover-${bookData.id}`}
                popoverTargetAction="hide"
                onClick={() => onCancel()}
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
}
