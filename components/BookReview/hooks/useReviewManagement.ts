"use client";
import { useState } from "react";
import { validateForm } from "../utils/validateForm";
import { addReview, deleteReview, editReview } from "../utils/reviewApi";
import type { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import type { ReviewData } from "@/app/types/review";
type Router = ReturnType<typeof useRouter>;

export function useReviewManagement(
  initialReviews: ReviewData[],
  params: { id?: string },
  router: Router
) {
  const [rating, setRating] = useState<number | undefined>();
  const [bookCommentsById, setBookCommentsById] = useState<ReviewData[]>(
    initialReviews || []
  );
  const [errorMessage, setErrorMessage] = useState<{
    rating?: string;
    reviewerName?: string;
    reviewerComment?: string;
  }>({});

  const defaultEditValues = {
    id: "",
    book_id: "",
    reviewer: "",
    comment: "",
    rating: 0,
  };

  const [isSubmitting, setIssubmitting] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string>();
  const [editValues, setEditValues] = useState<ReviewData>(defaultEditValues);
  const [formData, setFormData] = useState({
    reviewerName: "",
    reviewerComment: "",
  });
  const [messages, setMessages] = useState({
    submit: "",
    delete: "",
    edit: "",
  });

  async function handleReviewSubmit(e: FormEvent) {
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
      book_id: params.id || "",
      reviewer: formData.reviewerName,
      comment: formData.reviewerComment,
      rating: rating || 0,
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
    setRating(undefined);
    if (result.data && result.data[0]) {
      setBookCommentsById([...bookCommentsById, result.data[0]]);
    }
    setIssubmitting(false);
    router.refresh();
    setTimeout(() => setMessages({ ...messages, submit: "" }), 5000);
  }

  async function handleDeleteReview(reviewId: string) {
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

  function startEditing(review: ReviewData) {
    setEditingReviewId(review.id);
    setEditValues(review);
  }

  function cancelEditing() {
    setEditingReviewId("");
    setEditValues(defaultEditValues);
  }

  async function saveEdit(reviewId: string) {
    try {
      const result = await editReview(reviewId, editValues);
      if (result.error) {
        console.error("❌ Save edit Supabase error:", result.error);
        setMessages({
          ...messages,
          edit: "Something went wrong. Please try again.",
        });
        return;
      }

      setMessages({ ...messages, edit: "Review updated successfully!" });
      setEditingReviewId("");
      setEditValues(defaultEditValues);
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
    setReviewerName: (value: string) =>
      setFormData({ ...formData, reviewerName: value }),
    reviewerComment: formData.reviewerComment,
    setReviewerComment: (value: string) =>
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
