import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router";
import { validateForm } from "./utils/validateForm";
import { addReviewToList } from "./utils/addReviewToList";
import { deleteReview } from "./utils/deleteReview";
import { getBookCommentsById } from "./utils/getBookCommentsById";
import StarRating from "../StarRating/StarRating";
import { supabase } from "../../supabaseClient";

function BookReview() {
  const params = useParams();
  const [rating, setRating] = useState();
  const [bookCommentsById, setBookCommentsById] = useState([]);
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerComment, setReviewerComment] = useState("");
  const [errormessage, setErrorMessage] = useState({});
  const [isSubmitting, setIssubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [filterReview, setFilterReview] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    handleGetBookCommentsById({ id: params.id });
  }, [params.id]);

  useEffect(() => {
    const filterFromUrl = searchParams.get("rating");
    setFilterReview(parseInt(filterFromUrl) || 0);
  }, [searchParams]);

  async function handleGetBookCommentsById({ id }) {
    const { data } = await getBookCommentsById(id);
    setBookCommentsById(data);
  }

  async function handleReviewSubmit(e) {
    e.preventDefault();
    setErrorMessage({});
    setSubmitMessage("");

    const errors = validateForm(rating, reviewerName, reviewerComment);
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

    const { error } = await addReviewToList(reviewData);
    if (error) {
      setSubmitMessage("Something went wrong. Please try again.");
      setIssubmitting(false);
      return;
    }

    setSubmitMessage("Review is added successfully!");
    setReviewerName("");
    setReviewerComment("");
    setRating();
    handleGetBookCommentsById({ id: params.id });
    setIssubmitting(false);
    setTimeout(() => setSubmitMessage(""), 5000);
  }

  async function handleDeleteReview(reviewId) {
    const { error } = await deleteReview(reviewId);

    if (error) {
      setDeleteMessage("Something went wrong. Please try again.");
      return;
    }

    setDeleteMessage("Review is deleted succesfully.");
    handleGetBookCommentsById({ id: params.id });
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
    const { error } = await supabase
      .from("comments")
      .update({
        reviewer: editValues.reviewer,
        comment: editValues.comment,
        rating: editValues.rating,
      })
      .eq("id", reviewId);

    if (error) {
      setEditMessage("Something went wrong. Please try again.");
      return;
    }

    setEditMessage("Review updated successfully!");
    setEditingReviewId(null);
    setEditValues({});
    handleGetBookCommentsById({ id: params.id });
    setTimeout(() => setEditMessage(""), 5000);
  }

  console.log(filterReview);

  return (
    <>
      <div className="bg-white p-4 my-8 rounded-lg">
        <h3 className="font-bold text-2xl text-gray-800 font-playfair">
          Leave a review
        </h3>

        <StarRating rating={rating} onRatingChange={setRating} />

        {errormessage.rating && (
          <p className="text-red-500 text-sm mt-2">{errormessage.rating}</p>
        )}

        {submitMessage && (
          <p className="text-green-500 text-sm mt-2">{submitMessage}</p>
        )}

        <form className="mt-4" onSubmit={handleReviewSubmit} noValidate>
          <input
            type="text"
            placeholder="Name*"
            className={`w-full mb-2 p-1 border-2 rounded-md ${
              errormessage.reviewerName ? "border-pink-500" : "border-[#bccdbc]"
            } focus:border-blue-500`}
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            required
          />

          {errormessage.reviewerName && (
            <p className="text-red-500 text-sm mb-2">
              {errormessage.reviewerName}
            </p>
          )}

          <input
            type="text"
            placeholder="Leave a review*"
            className={`w-full mb-2 p-1 border-2 rounded-md ${
              errormessage.reviewerComment
                ? "border-pink-500"
                : "border-[#bccdbc]"
            } focus:border-blue-500`}
            value={reviewerComment}
            onChange={(e) => setReviewerComment(e.target.value)}
            required
            maxLength="50"
          />

          {errormessage.reviewerComment && (
            <p className="text-red-500 text-sm mb-2">
              {errormessage.reviewerComment}
            </p>
          )}

          <button
            className="bg-[#bccdbc] text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>

        <div className="md:flex md:justify-between items-center mt-8">
          <h3 className="text-lg font-semibold text-gray-800 font-playfair mb-2">
            Recent reviews
          </h3>
          <p className="">Filter star rating:</p>
        </div>
        <div className="md:justify-end md:flex">
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
                setSearchParams({ rating: filterOption });
              }}
            >
              {filterOption === 0 ? "All" : `${filterOption}★`}
            </button>
          ))}
        </div>

        <div>
          {deleteMessage && (
            <p className="text-green-500 text-sm mt-2">{deleteMessage}</p>
          )}
          {editMessage && (
            <p className="text-green-500 text-sm mt-2">{editMessage}</p>
          )}
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
                      onClick={() => handleDeleteReview(review.id)}
                      className="bg-[#f1a9ae] text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default BookReview;
