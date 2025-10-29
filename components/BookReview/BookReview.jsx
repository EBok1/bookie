"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { validateForm } from "./utils/validateForm";
import { addReview, deleteReview, editReview } from "./utils/reviewApi";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import { ReviewFilters } from "../ReviewFilters/ReviewFilters";
import { ReviewList } from "../ReviewList/ReviewList";
import { useReviewFilter } from "./hooks/useReviewFilter";

function BookReview({ reviewData }) {
  const params = useParams();
  const router = useRouter();
  const [rating, setRating] = useState();
  const [bookCommentsById, setBookCommentsById] = useState(reviewData || []);
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerComment, setReviewerComment] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [isSubmitting, setIssubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const {filterReview, setFilterReview, setSearchParams } = useReviewFilter();

  async function handleReviewSubmit(e) {
    e.preventDefault();
    setErrorMessage({});
    setSubmitMessage("");

    const errors = validateForm({ rating, reviewerName, reviewerComment });
    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors);
      return;
    }

    setIssubmitting(true);
    const reviewData = {
      book_id: params.id,
      reviewer: reviewerName,
      comment: reviewerComment,
      rating: rating,
    };

    const result = await addReview(reviewData);
    if (result.error) {
      setSubmitMessage("Something went wrong. Please try again.");
      setIssubmitting(false);
      return;
    }

    setSubmitMessage("Review is added successfully!");
    setReviewerName("");
    setReviewerComment("");
    setRating();
    if (result.data && result.data[0]) {
      setBookCommentsById([...bookCommentsById, result.data[0]]);
    }
    setIssubmitting(false);
    router.refresh(); // Refresh to update average rating
    setTimeout(() => setSubmitMessage(""), 5000);
  }

  async function handleDeleteReview(reviewId) {
    const result = await deleteReview(reviewId);
    if (result.error) {
      setDeleteMessage("Something went wrong. Please try again.");
      return;
    }

    setDeleteMessage("Review is deleted succesfully.");
    setBookCommentsById(
      bookCommentsById.filter((review) => review.id !== reviewId)
    );
    router.refresh(); // Refresh to update average rating
    setTimeout(() => setDeleteMessage(""), 5000);
  }

  function startEditing(review) {
    setEditingReviewId(review.id);
    setEditValues({
      reviewer: review.reviewer,
      comment: review.comment,
      rating: review.rating,
    });
  }

  function cancelEditing() {
    setEditingReviewId(null);
    setEditValues({});
  }

  async function saveEdit(reviewId) {
    try {
      const result = await editReview(reviewId, editValues);
      console.log("✅ Save edit result:", { result });
      if (result.error) {
        console.error("❌ Save edit Supabase error:", result.error);
        setEditMessage("Something went wrong. Please try again.");
        return;
      }

      setEditMessage("Review updated successfully!");
      setEditingReviewId(null);
      setEditValues({});
      setBookCommentsById(
        bookCommentsById.map((review) =>
          review.id === reviewId ? { ...review, ...editValues } : review
        )
      );
      router.refresh(); // Refresh to update average rating
      setTimeout(() => setEditMessage(""), 5000);
    } catch (err) {
      console.error("❌ Save edit catch error:", err);
      setEditMessage("Something went wrong. Please try again.");
    }
  }

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
