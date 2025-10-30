"use client";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import { ReviewFilters } from "../ReviewFilters/ReviewFilters";
import { ReviewList } from "../ReviewList/ReviewList";

function BookReview({ reviewData }) {
  return (
    <>
      <ReviewForm reviewData={reviewData} />

      <ReviewFilters reviewData={reviewData}
      />

      <ReviewList reviewData={reviewData}
      />
    </>
  );
}

export default BookReview;
