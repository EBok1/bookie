"use client";
import StarRating from "../StarRating/StarRating";

export function ReviewForm({
  rating,
  onRatingChange,
  errorMessage,
  submitMessage,
  reviewerName,
  onReviewerNameChange,
  reviewerComment,
  onReviewerCommentChange,
  onSubmit,
  isSubmitting,
}) {
  return (
    <div className="bg-white p-4 my-8 rounded-lg">
      <h3 className="font-bold text-2xl text-gray-800 font-playfair">
        Leave a review
      </h3>

      <StarRating rating={rating} onRatingChange={onRatingChange} />

      {errorMessage.rating && (
        <p className="text-red-500 text-sm mt-2">{errorMessage.rating}</p>
      )}

      {submitMessage && (
        <p className="text-green-500 text-sm mt-2">{submitMessage}</p>
      )}

      <form className="mt-4" onSubmit={onSubmit} noValidate>
        <div className="mb-2">
          <label
            htmlFor="reviewer-name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name*
          </label>
          <input
            id="reviewer-name"
            type="text"
            placeholder="Name*"
            className={`w-full p-1 border-2 rounded-md ${
              errorMessage.reviewerName ? "border-pink-500" : "border-[#bccdbc]"
            } focus:border-blue-500`}
            value={reviewerName}
            onChange={(e) => onReviewerNameChange(e.target.value)}
            required
          />
          {errorMessage.reviewerName && (
            <p className="text-red-500 text-sm mt-1">
              {errorMessage.reviewerName}
            </p>
          )}
        </div>

        <div className="mb-2">
          <label
            htmlFor="reviewer-comment"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Review*
          </label>
          <input
            id="reviewer-comment"
            type="text"
            placeholder="Leave a review*"
            className={`w-full p-1 border-2 rounded-md ${
              errorMessage.reviewerComment
                ? "border-pink-500"
                : "border-[#bccdbc]"
            } focus:border-blue-500`}
            value={reviewerComment}
            onChange={(e) => onReviewerCommentChange(e.target.value)}
            required
            maxLength="50"
          />
          {errorMessage.reviewerComment && (
            <p className="text-red-500 text-sm mt-1">
              {errorMessage.reviewerComment}
            </p>
          )}
        </div>

        <button
          className="bg-[#bccdbc] text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
