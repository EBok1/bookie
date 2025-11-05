"use client";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import { ReviewFilters } from "../ReviewFilters/ReviewFilters";
import { ReviewList } from "../ReviewList/ReviewList";
import type { ReviewData } from "@/app/types/review";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useReviewManagement } from "../BookReview/hooks/useReviewManagement";

type BookReviewProps = {
  reviewData: ReviewData[];
};

function BookReview({ reviewData }: BookReviewProps) {
  const params = useParams();
  const router = useRouter();
  const reviewManagement = useReviewManagement(reviewData, params, router);

  return (
    <>
      <ReviewForm reviewManagement={reviewManagement} />

      <ReviewFilters reviewManagement={reviewManagement} />

      <ReviewList reviewManagement={reviewManagement} />
    </>
  );
}

export default BookReview;
