import BookTag from "../BookTag/BookTag";

export const AverageBookRating = ({ averageRating }) => {
  return (
    <>
      <BookTag tag={`Averagerating: ${averageRating}`} variant="green" />
    </>
  );
};
