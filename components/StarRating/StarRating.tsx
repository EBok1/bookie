"use client";

type StarRatingProps = {
  rating: number | undefined;
  onRatingChange: (param: number) => void;
};

export default function StarRating({
  rating,
  onRatingChange,
}: StarRatingProps) {
  return (
    <>
      <div className="mt-2">
        {[1, 2, 3, 4, 5].map(
          (
            star // creates array and maps over it, for each star creates element, star represents current number
          ) => (
            <button
              key={star} // helps react track star (required for lists)
              className="cursor-pointer text-2xl"
              style={{ color: star <= (rating ?? 0) ? "gold" : "gray" }}
              onClick={(e) => {
                // event handlers function that runs when clicked
                e.stopPropagation(); // stops event bubbling (prevents click from traveling up)
                e.preventDefault(); // prevents browser default behaviour
                onRatingChange(star); // sets rating to star number that was clicked, updates state and renders new state
              }}
            >
              ★
            </button>
          )
        )}
      </div>
    </>
  );
}
