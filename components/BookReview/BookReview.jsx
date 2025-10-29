"use client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import { ReviewFilters } from "../ReviewFilters/ReviewFilters";
import { ReviewList } from "../ReviewList/ReviewList";
import { useReviewFilter } from "./hooks/useReviewFilter";
import { useReviewManagement } from "./hooks/useReviewManagement";

function BookReview({ reviewData }) {
  const params = useParams();
  const router = useRouter();
  const { filterReview, setFilterReview, setSearchParams } = useReviewFilter();
  const {
    rating,
    setRating,
    bookCommentsById,
    reviewerName,
    setReviewerName,
    reviewerComment,
    setReviewerComment,
    errorMessage,
    submitMessage,
    isSubmitting,
    deleteMessage,
    editMessage,
    editingReviewId,
    editValues,
    setEditValues,
    handleReviewSubmit,
    handleDeleteReview,
    startEditing,
    saveEdit,
    cancelEditing,
  } = useReviewManagement(reviewData, params, router);

  return (
    <>
      <ReviewForm
        rating={rating}
        onRatingChange={setRating}
        errorMessage={errorMessage}
        submitMessage={submitMessage}
        reviewerName={reviewerName}
        onReviewerNameChange={setReviewerName}
        reviewerComment={reviewerComment}
        onReviewerCommentChange={setReviewerComment}
        onSubmit={handleReviewSubmit}
        isSubmitting={isSubmitting}
      />

      <ReviewFilters
        filterReview={filterReview}
        onFilterChange={setFilterReview}
        deleteMessage={deleteMessage}
        editMessage={editMessage}
        setSearchParams={setSearchParams}
      />

      <ReviewList
        reviews={bookCommentsById}
        filterReview={filterReview}
        editingReviewId={editingReviewId}
        editValues={editValues}
        onEditValuesChange={setEditValues}
        onStartEdit={startEditing}
        onSaveEdit={saveEdit}
        onCancelEdit={cancelEditing}
        onDelete={handleDeleteReview}
      />
    </>
  );
}

export default BookReview;
