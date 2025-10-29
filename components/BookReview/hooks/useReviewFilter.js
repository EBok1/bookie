"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function useReviewFilter() {
  const [filterReview, setFilterReview] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const filterFromUrl = searchParams?.get("rating");
    setFilterReview(parseInt(filterFromUrl) || 0);
  }, [searchParams]);

  return {
    filterReview,
    setFilterReview,
    setSearchParams,
  };
}
