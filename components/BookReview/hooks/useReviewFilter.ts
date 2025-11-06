"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export function useReviewFilter() {
  const [filterReview, setFilterReview] = useState(0);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const filterFromUrl = searchParams?.get("rating");
    setFilterReview(parseInt(filterFromUrl || "0"));
  }, [searchParams]);

  function updateSearchParams(rating: string) {
    const params = new URLSearchParams(searchParams);
    params.set("rating", rating);
    router.push(`?${params.toString()}`, { scroll: false });
  }

  return {
    filterReview,
    setFilterReview,
    updateSearchParams,
  };
}
