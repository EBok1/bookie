import type { ReviewData } from "@/app/types/review";

export async function addReview(reviewData: ReviewData) {
  const response = await fetch("/api/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData),
  });
  const newResult = await response.json();
  return newResult;
}

export async function deleteReview(reviewId: ReviewData) {
  const response = await fetch(`/api/comments/${reviewId}`, {
    method: "DELETE",
  });
  const newResult = await response.json();
  return newResult;
}

export async function editReview(reviewId: ReviewData, editValues: ReviewData) {
  const response = await fetch(`/api/comments/${reviewId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editValues),
  });
  const newResult = await response.json();
  return newResult;
}
