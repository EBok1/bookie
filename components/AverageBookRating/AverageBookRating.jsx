import BookTag from "../BookTag/BookTag";

export const AverageBookRating = ({ averageRating }) => {
  const displayText =
    typeof averageRating === "number"
      ? `Average rating: ${averageRating}★` 
      : `Average rating: ${averageRating}`; 

  return (
    <div className="mb-2">
      <BookTag tag={displayText} />
    </div>
  );
};
