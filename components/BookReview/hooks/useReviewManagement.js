"use client";
import { useState } from "react";
import { validateForm } from "../utils/validateForm";
import { addReview, deleteReview, editReview } from "../utils/reviewApi";

export function useReviewManagement(initialReviews = [], params, router) {
  const [rating, setRating] = useState();
  const [bookCommentsById, setBookCommentsById] = useState(
    initialReviews || []
  );
  const [errorMessage, setErrorMessage] = useState({});
  const [isSubmitting, setIssubmitting] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [formData, setFormData] = useState({
    reviewerName: "",
    reviewerComment: "",
  });
  const [messages, setMessages] = useState({
    submit: "",
    delete: "",
    edit: "",
  });

  async function handleReviewSubmit(e) {
    e.preventDefault();
    setErrorMessage({});
    setMessages({ ...messages, submit: "" });

    const errors = validateForm({
      rating,
      reviewerName: formData.reviewerName,
      reviewerComment: formData.reviewerComment,
    });
    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors);
      return;
    }

    setIssubmitting(true);
    const reviewData = {
      book_id: params.id,
      reviewer: formData.reviewerName,
      comment: formData.reviewerComment,
      rating: rating,
    };

    const result = await addReview(reviewData);
    if (result.error) {
      setMessages({
        ...messages,
        submit: "Something went wrong. Please try again.",
      });
      setIssubmitting(false);
      return;
    }

    setMessages({ ...messages, submit: "Review is added successfully!" });
    setFormData({ reviewerName: "", reviewerComment: "" });
    setRating();
    if (result.data && result.data[0]) {
      setBookCommentsById([...bookCommentsById, result.data[0]]);
    }
    setIssubmitting(false);
    router.refresh(); 
    setTimeout(() => setMessages({ ...messages, submit: "" }), 5000);
  }

  async function handleDeleteReview(reviewId) {
    const result = await deleteReview(reviewId);
    if (result.error) {
      setMessages({
        ...messages,
        delete: "Something went wrong. Please try again.",
      });
      return;
    }

    setMessages({ ...messages, delete: "Review is deleted succesfully." });
    setBookCommentsById(
      bookCommentsById.filter((review) => review.id !== reviewId)
    );
    router.refresh(); 
    setTimeout(() => setMessages({ ...messages, delete: "" }), 5000);
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
        setMessages({
          ...messages,
          edit: "Something went wrong. Please try again.",
        });
        return;
      }

      setMessages({ ...messages, edit: "Review updated successfully!" });
      setEditingReviewId(null);
      setEditValues({});
      setBookCommentsById(
        bookCommentsById.map((review) =>
          review.id === reviewId ? { ...review, ...editValues } : review
        )
      );
      router.refresh(); 
      setTimeout(() => setMessages({ ...messages, edit: "" }), 5000);
    } catch (err) {
      console.error("❌ Save edit catch error:", err);
      setMessages({
        ...messages,
        edit: "Something went wrong. Please try again.",
      });
    }
  }

  return {
    rating,
    setRating,
    bookCommentsById,
    reviewerName: formData.reviewerName,
    setReviewerName: (value) =>
      setFormData({ ...formData, reviewerName: value }),
    reviewerComment: formData.reviewerComment,
    setReviewerComment: (value) =>
      setFormData({ ...formData, reviewerComment: value }),
    errorMessage,
    isSubmitting,
    submitMessage: messages.submit,
    deleteMessage: messages.delete,
    editMessage: messages.edit,
    editingReviewId,
    editValues,
    setEditValues,
    handleReviewSubmit,
    handleDeleteReview,
    startEditing,
    saveEdit,
    cancelEditing,
  };
}
