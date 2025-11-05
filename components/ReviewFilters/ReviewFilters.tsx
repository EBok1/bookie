"use client";
import { useReviewFilter } from "../BookReview/hooks/useReviewFilter";
import { useReviewManagement } from "../BookReview/hooks/useReviewManagement";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import type { ReviewData } from "@/app/types/review";


type ReviewFiltersProps = {
  reviewData: ReviewData[]; 
}

export function ReviewFilters({ reviewData }: ReviewFiltersProps) {
  const params = useParams();
  const router = useRouter();
  const { filterReview, setFilterReview, updateSearchParams } =
    useReviewFilter();
  const { deleteMessage, editMessage } = useReviewManagement(
    reviewData,
    params,
    router
  );

  return (
    <>
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
                updateSearchParams(filterOption);
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
    </>
  );
}
