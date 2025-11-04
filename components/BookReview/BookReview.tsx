"use client";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import { ReviewFilters } from "../ReviewFilters/ReviewFilters";
import { ReviewList } from "../ReviewList/ReviewList";
import { ReviewData } from "@/app/types/review";

type BookReviewProps = {
  reviewData: ReviewData[]; 
}

function BookReview({ reviewData }: BookReviewProps) {
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
