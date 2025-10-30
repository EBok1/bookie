"use client";
import { ReviewCard } from "../ReviewCard/ReviewCard";
import { useReviewFilter } from "../BookReview/hooks/useReviewFilter";
import { useReviewManagement } from "../BookReview/hooks/useReviewManagement";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export function ReviewList({ reviewData }) {
  const params = useParams();
  const router = useRouter();
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
  } = useReviewManagement(reviewData, params, router);

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
