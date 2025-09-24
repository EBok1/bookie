import React from "react";

function BookReview(props) {
  //props as a parameter (variable a fucntion uses to recieve data from outside)
  const rating = props.rating; //extracts rating value from props and stores in constant (current number 0,1,2,3,4 or 5)
  const setRating = props.setRating; //extracts setRating function from props and stores in constant (function to update rating when user clicks star)

  return (
    <>
      <div>
        {[1, 2, 3, 4, 5].map(
          (
            star // creates array and maps over it, for each star creates element, star represents current number
          ) => (
            <button
              key={star} // helps react track star (required for lists)
              className="cursor-pointer text-4xl"
              style={{ color: star <= rating ? "gold" : "gray" }} // if current rating is greater/equal to star number → gold otherwise gray
              onClick={(e) => { // event handlers function that runs when clicked 
                e.stopPropagation(); // stops event bubbling (prevents click from traveling up)
                e.preventDefault(); // prevents browser default behaviour 
                setRating(star); // sets rating to star number that was clicked, updates state and renders new state 
              }}
            >
              ★
            </button>
          )
        )}
      </div>
      <input type="text" placeholder="Leave a review" />
    </>
  );
}

export default BookReview;
