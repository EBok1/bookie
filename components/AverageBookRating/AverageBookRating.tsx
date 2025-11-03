import BookTag from "../BookTag/BookTag";

type AverageBookRatingProps = {
  averageRating: number | string;
};

export const AverageBookRating = ({ averageRating }: AverageBookRatingProps) => {
  const displayText =
    typeof averageRating === "number"
      ? `Average rating: ${averageRating}★` 
      : `Average rating: ${averageRating}`; 

  return (
    <div className="mb-2">
      <BookTag tag={displayText} variant="grey"/>
    </div>
  );
};
