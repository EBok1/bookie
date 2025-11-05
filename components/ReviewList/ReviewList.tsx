"use client";
import { ReviewCard } from "../ReviewCard/ReviewCard";
import { useReviewFilter } from "../BookReview/hooks/useReviewFilter";
import type { useReviewManagement } from "../BookReview/hooks/useReviewManagement";

type ReviewListProps = {
  reviewManagement: ReturnType<typeof useReviewManagement>;
};

export function ReviewList({ reviewManagement }: ReviewListProps) {
  const { filterReview } = useReviewFilter();
  const {
    bookCommentsById: reviews,
    editingReviewId,
    editValues,
    setEditValues,
    startEditing,
    saveEdit,
    cancelEditing,
    handleDeleteReview,
  } = reviewManagement;

  const filteredReviews = reviews.filter((review) => {
    if (filterReview === 0) {
      return true;
    }
    return review.rating === filterReview;
  });

  if (filteredReviews.length === 0 && filterReview !== 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 text-lg">
          No reviews with {filterReview}★ rating yet!
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Be the first to leave a {filterReview}-star review.
        </p>
      </div>
    );
  }

  if (filteredReviews.length === 0 && filterReview === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 text-lg">No reviews yet!</p>
        <p className="text-gray-500 text-sm mt-2">
          Be the first to leave a review.
        </p>
      </div>
    );
  }

  return (
    <div>
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          isEditing={editingReviewId}
          editValues={editValues}
          onEditValuesChange={setEditValues}
          onStartEdit={startEditing}
          onSaveEdit={saveEdit}
          onCancelEdit={cancelEditing}
          onDelete={handleDeleteReview}
        />
      ))}
    </div>
  );
}
