"use client";
import { ReviewCard } from "../ReviewCard/ReviewCard";

export function ReviewList({
  reviews,
  filterReview,
  editingReviewId,
  editValues,
  onEditValuesChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}) {
  return (
    <div>
      {reviews
        .filter((review) => {
          if (filterReview === 0) {
            return true;
          }
          return review.rating === filterReview;
        })
        .map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            isEditing={editingReviewId}
            editValues={editValues}
            onEditValuesChange={onEditValuesChange}
            onStartEdit={onStartEdit}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
            onDelete={onDelete}
          />
        ))}
    </div>
  );
}