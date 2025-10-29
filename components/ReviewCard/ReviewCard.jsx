"use client";

export function ReviewCard({
  review,
  isEditing,
  editValues,
  onEditValuesChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}) {
  return (
    <div
      key={review.id}
      className="rounded-md mt-4 px-3 py-1 border-[#bccdbc] border-2"
    >
      {isEditing === review.id ? (
        <>
          <input
            type="text"
            value={editValues.reviewer}
            onChange={(e) =>
              onEditValuesChange({
                ...editValues,
                reviewer: e.target.value,
              })
            }
            className="w-full rounded-md my-2 p-1 border-[#bccdbc] border-2"
          />
          <input
            type="text"
            value={editValues.comment}
            onChange={(e) =>
              onEditValuesChange({
                ...editValues,
                comment: e.target.value,
              })
            }
            className="w-full rounded-md mb-2 p-1 border-[#bccdbc] border-2"
          />
          <input
            type="number"
            min="1"
            max="5"
            value={editValues.rating}
            onChange={(e) =>
              onEditValuesChange({
                ...editValues,
                rating: parseInt(e.target.value),
              })
            }
            className="mb-2 rounded-md p-1 border-[#bccdbc] border-2"
          />
        </>
      ) : (
        <>
          <h2 className="text-lg font-medium text-gray-800">
            {review.reviewer}
          </h2>
          <p>{review.comment}</p>
          <p>{review.rating} ★ </p>
        </>
      )}

      {isEditing === review.id ? (
        <>
          <div className="mb-1">
            <button
              onClick={() => onSaveEdit(review.id)}
              className="bg-[#bccdbc] text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1 m-1"
            >
              Save
            </button>
            <button
              onClick={() => onCancelEdit()}
              className="bg-[#f1a9ae] text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1 m-1"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => onStartEdit(review)}
            className="bg-[#bccdbc] text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1 mt-3 mb-2 mr-2"
          >
            Edit
          </button>

          <button
            popoverTarget={`delete-popover-${review.id}`}
            className="bg-[#f1a9ae] text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1"
          >
            Delete
          </button>
          <div
            popover="auto"
            id={`delete-popover-${review.id}`}
            className="border border-gray-300 bg-gray-100 rounded-md p-4 w-auto h-80 mx-9 shadow-md bg-opacity-90"
          >
            <p className="flex justify-center">
              Are you sure you want to delete this review?
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => onDelete(review.id)}
                className="bg-[#f1a9ae] text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1"
              >
                Delete
              </button>
              <button
                popoverTarget={`delete-popover-${review.id}`}
                popoverTargetAction="hide"
                onClick={() => onCancelEdit()}
                className="bg-white text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1 ml-5"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
