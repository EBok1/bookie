"use client";
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { validateForm } from "./utils/validateForm";
import StarRating from "../StarRating/StarRating";
import { addReview, deleteReview, editReview } from "./utils/reviewApi";
import { ReviewForm } from "../ReviewForm/ReviewForm";

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
  const [filterReview, setFilterReview] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const filterFromUrl = searchParams?.get("rating");
    setFilterReview(parseInt(filterFromUrl) || 0);
  }, [searchParams]);

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

      <div className="md:flex md:justify-between items-center mt-8">
        <h3 className="text-lg font-semibold text-gray-800 font-playfair mb-2">
          Recent reviews
        </h3>
        <p>Filter star rating:</p>
      </div>
      <div className="md:flex justify-between">
        <div
          className={`fixed top-0 left-0 right-0 bg-green-500 text-white p-3 text-center z-50 transition-transform duration-300 md:hidden ${
            deleteMessage ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {" "}
          {deleteMessage && (
            <p className="text-white text-sm">{deleteMessage}</p>
          )}
        </div>
        <div
          className={`fixed top-0 left-0 right-0 bg-green-500 text-white p-3 text-center z-50 transition-transform duration-300 md:hidden ${
            editMessage ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {" "}
          {editMessage && <p className="text-white text-sm">{editMessage}</p>}
        </div>
        <div>
          {[0, 1, 2, 3, 4, 5].map((filterOption) => (
            <button
              key={filterOption}
              className={
                filterReview === filterOption
                  ? "rounded-md p-2 border-[#bccdbc] border-2"
                  : "p-2 py-1 border-transparent border-2"
              }
              onClick={() => {
                setFilterReview(filterOption);
                if (setSearchParams) {
                  setSearchParams({ rating: filterOption });
                }
              }}
            >
              {filterOption === 0 ? "All" : `${filterOption}★`}
            </button>
          ))}
        </div>
        {deleteMessage && (
          <div className="hidden md:block bg-green-100 text-green-800 px-3 py-2 rounded-md text-sm">
            {deleteMessage}
          </div>
        )}
        {editMessage && (
          <p className="hidden md:block bg-green-100 text-green-800 px-3 py-2 rounded-md text-sm">
            {editMessage}
          </p>
        )}
      </div>

      <div>
        {bookCommentsById
          .filter((review) => {
            if (filterReview === 0) {
              return true;
            }
            return review.rating === filterReview;
          })
          .map((review) => (
            <div
              key={review.id}
              className="rounded-md mt-4 px-3 py-1 border-[#bccdbc] border-2"
            >
              {editingReviewId === review.id ? (
                <>
                  <input
                    type="text"
                    value={editValues.reviewer}
                    onChange={(e) =>
                      setEditValues({
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
                      setEditValues({
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
                      setEditValues({
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

              {editingReviewId === review.id ? (
                <>
                  <div className="mb-1">
                    <button
                      onClick={() => saveEdit(review.id)}
                      className="bg-[#bccdbc] text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1 m-1"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => cancelEditing()}
                      className="bg-[#f1a9ae] text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1 m-1"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEditing(review)}
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
                        onClick={() => handleDeleteReview(review.id)}
                        className="bg-[#f1a9ae] text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1"
                      >
                        Delete
                      </button>
                      <button
                        popoverTarget={`delete-popover-${review.id}`}
                        popoverTargetAction="hide"
                        onClick={() => cancelEditing()}
                        className="bg-white text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1 ml-5"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </>
  );
}

export default BookReview;
